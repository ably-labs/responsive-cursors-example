# Responsive cursors example

This an example of using the [Spaces](https://ably.com/docs/products/spaces) [Cursors API](https://ably.com/docs/spaces/cursors) in an application with a responsive canvas.

There are many types of responsive applications that might have different requirements; this particular example assumes a canvas within the viewport that has dynamic width and height that does not keep it's ratio.

The squeres within the canvas show an issue that might arise with this approach; any elements within the canvas which have fixed values, irrevelant of the size of the canvas, will be inaccurate. If both the width and height are fixed, you can switch to listening to mouse events over that element only - essentially treating the top-left corner of the element as your new 0,0 point.

For simplicity, in these scenarios, it's best to work either with only dynamic values or only fixed values (like for example in Miro, where the whole canvas and it's elements are essentially fixed values that scale only with zoom - this is a simplifcation, but hopefully helps in thinking about implementing responsive cursors).

# Running the example

See `.tool-versions` for the nodejs version this app was developed with.


You will need an [Ably API key](https://ably.com/docs/spaces/setup#authenticate). Create an `.env` by copying the `.env.example` file and paste your key there.

Assuming you have node & npm, run:

```bash
npm i
npm run dev
```

Open the app in two separate browser windows to see the cursor.

This application is created with Vite so should be easy to deploy to Vercel or Netlify to test with more users too.
