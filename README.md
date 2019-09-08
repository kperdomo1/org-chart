## Big Corp Chart
ReactJs web app for displaying a a corp's employees through an organizational chart.

Demo: https://org-chart.kperdomoch.now.sh/
### The idea behind
All we are given for each employee are it's (only) parent ID node, in no particular order.
An organization hierarchy diagram must go from up to bottom... So, given the root node:


During initial rendering, we:
- Fetch the tree root (manager = 0)
- Fetch the root's children
- For each of the root's children, we (pre)fetch children nodes.
This will be used to add "expand" icon to those who have children nodes.


When clicked on children node:
 - Show collapsed nodes and (pre)fetch it's children to add "expand" icon if it corresponds.


Thus we construct the data structure with parent - children relation:

For example:
```
{
 rootId: 9,
 '9': { node: {...}, children: [6, 1], expanded: true },
 '6': { node: {...}, children: [], expanded: false },
 '1': { node: {...}, children: ['8, '4'], expanded: false }
}
```
We will then be able to perform a [recursive rendering](https://github.com/kperdomo1/org-chart/blob/master/src/component/Tree/Nodes.js)
through a pre-order traversal algorithm.

### Available Scripts (node v10.13)
In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.