# Alexandra Riano — GitHub Pages

This repository powers <https://alexandra-riano.github.io/>.

## Add a project

1. Create a folder under `projects/`, using a short URL-friendly name.
2. Add an `index.html` file inside that folder.
3. Link the project from `projects/index.html` and, if desired, the home page.
4. Commit and push to `main`.

For example, `projects/css-grid/index.html` is published at:

<https://alexandra-riano.github.io/projects/css-grid/>

GitHub Pages automatically republishes the site after each push to `main`.

## Structure

```text
index.html                 Home page
assets/                    Shared CSS and JavaScript
projects/index.html        Project directory
projects/<project>/        One self-contained static site per project
```

Use relative asset links in project pages so they continue to work at nested
paths. Add an empty `.nojekyll` file if future project assets use names that
Jekyll would otherwise ignore, such as folders beginning with an underscore.
