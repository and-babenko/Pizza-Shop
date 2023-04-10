# Link

https://andbabenko-simple-ecommerce.vercel.app/

# Implemented functionality

- Sending a request with Axios library createAsyncThunk.
- Processing of different request states: sending, successful and unsuccessful completion.
- Filtering, sorting and searching for products.
- Adaptability for different types of devices.
- Debounce for the search bar.
- Selecting the type of product and then adding it to the cart. Calculation of the total cost of goods.
- Saving the product cart in LocalStorage.

# Project basis:

The project is based on the Archakov course (https://www.youtube.com/@ArchakovBlog). Technologies used:

- Typescript.
- React with function components.
- Redux Toolkit.
- React Router V.6.
- Axios.
- For backend emitation was used mockapi.

# Project refinement:

- Styles rewritten for modular architecture using SCSS.
- Added mobile devices layouts.
- JSX code was also rewritten.
- JS code was also rewritten. It's much more readable and better structured now.
- Using React router hooks for navigation instead browser API.
- Some extra pages added.
- Error and loading states.
- Error Boundary made with ComponentDidCatch.
- Better JSON structure. Adding to cart items with different characteristics work correctly.
- Redux Presist for slices and Local Storage synchronization.
- Some TSConfig updates.
- Multiple filters rework (but mockapi doesn't allow using combination of search and filters).

# Architectural improvements

All imports and exports are implemented through a public API, styles are also encapsulated through modular imports. It is based on the following layers:

1. Shared - UI, assets, public styles. Can be used on any of the above layers. Was taken from FSD-architecture and works as intended.
2. Соmponents - public components, can be used in Modules and Pages.
3. Modules - encapsulated logic with its own slice, private types. Can import data from Shared and Components
4. Pages - compose layout for modules and components. Was taken from FSD-architecture.
5. App - global styles, project settings and configs, providers, HOCs, Error Boundary. Was taken from FSD-architecture and works as intended.

There is a clear lack of layer types in the project, only at the end of it became clear why FSD-architecture has so many layers. Also, the project was written first during the course, and after the end of the course was rewritten independently, but without a pre-prepared scheme of interaction between the modules the project has a number of architectural problems.

Firstly, this project has single layer imports. Secondly, the data flow is not unidirectional: components (lower level layer) import entities from modules (higher level layer).

This results in excessive coupling between application modules. The problem is solved by adding new layers, as well as denser links between parent and child components. I will keep this experience in mind when writing future projects.
