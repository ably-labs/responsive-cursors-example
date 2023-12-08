import './style.css'

import Spaces from '@ably/spaces';
import { Realtime } from 'ably';
import { nanoid } from 'nanoid';
import { generate } from 'random-words';
import uniqolor from 'uniqolor';

const client = new Realtime.Promise({ key: import.meta.env.VITE_ABLY_API_KEY, clientId: nanoid() });
const spaces = new Spaces(client);
const space = await spaces.get('myspace');

const username = generate(({ wordsPerString: 2, separator: "-" }));

await space.enter({
  username,
  color: uniqolor(username).color
});

const canvas = document.querySelector('.canvas');

const self = await space.members.getSelf();

space.cursors.subscribe('update', async (cursorUpdate) => {
  const existingNode = canvas.querySelector(`#connectionid-${cursorUpdate.connectionId}`);

  if (existingNode && cursorUpdate?.data?.status === 'leave') {
    canvas.removeChild(existingNode);
    return;
  }

  if (self.connectionId === cursorUpdate.connectionId) {
    return;
  }

  if (existingNode) {
    existingNode.style.top = `${cursorUpdate.position.y}px`;
    existingNode.style.left = `${cursorUpdate.position.x}px`;
  } else {
    const node = document.createElement('span');
    node.id = `connectionid-${cursorUpdate.connectionId}`;
    node.classList.add('cursor');
    node.style.top = `${cursorUpdate.position.y}px`;
    node.style.left = `${cursorUpdate.position.x}px`;
    const member = await space.members.getByConnectionId(cursorUpdate.connectionId);
    node.style.backgroundColor = member.profileData.color || 'black';
    canvas.appendChild(node)
  }
});


canvas.addEventListener('mousemove', ({ clientX, clientY }) => {
  space.cursors.set({ position: { x: clientX, y: clientY } });
});

canvas.addEventListener('mouseleave', ({ clientX, clientY }) => {
  space.cursors.set({ position: { x: clientX, y: clientY }, data: { status: 'leave' } });
});

space.members.subscribe('leave', (member) => {
  const existingNode = canvas.querySelector(`#connectionid-${member.connectionId}`);
  canvas.removeChild(existingNode);
})