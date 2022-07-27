---
title: How to build a blog using Next.js and Markdoc
date: 2022-07-26
summary: Learn how to create a build using Next.js and Markdoc from start to finish
---

We will be using **Next.js** and **Markdoc** to create a static blog site from Markdown files. I chose Next.js because the developer experience is amazing for creating static sites. I chose Markdoc as the tool for parsing out our Markdown files.

# Install Next.js

Let's start by creating a new Next.js project.

### Using yarn

```
yarn create next-app
```

### Using npm

```
npx create-next-app
```

# Install Markdoc

Stripe recently released Markdoc as an open source Markdown processor. Stripe uses Markdoc for their documentation, and their documentation is known as one of the best examples of technical documentation. I chose Markdoc because it provides the cleanest writing experience compared to other Markdown processors.

The Markdown is decoupled from any implementation details, so when you are editing your Markdown files, you can fully focus on writing content.

Markdoc also supports validating your Markdown files, which will make it easy to enforce any structural, syntactical, or grammatical rules if your blog has many contributors.

Let's install the Markdoc package.

### Using yarn

```
yarn add @markdoc/markdoc --save
```

### Using npm

```
npm install @markdoc/markdoc --save
```

# Create your first blog post

Create a new folder in your project called `posts/`. This is where your Markdown blog post files will live.

Create a new Markdown file `posts/welcome-to-my-new-blog.md` and add the following sample content:

```
---
title: Welcome to my new blog
date: 2022-07-27
---

Welcome to my new blog created using Next.js and Markdoc.
```

# Set up your first route

Let's begin by setting up a new route for your blog posts.

Create an empty file in your project under the path `pages/blog/[slug].js`.

Next.js automatically sets up routes for you when you create files under the `pages` directory.

The `[slug].js` in `pages/blog/[slug].js` means a user can go to `welcome-to-my-new-blog`, and the `[slug].js` file will be responsible for handling the route and returning the contents of the matching Markdown file.

## Using the getStaticPaths function

We will create a `getStaticPaths` function in `[slug].js` that will return possible blog post URLs based on our Markdown files in the `posts/` directory. Next.js looks for the `getStaticPaths` function as part of the framework to make the work easier for you.

First, install the `glob-promise` package so we can find all of our Markdown files in the `posts/` folder in one line of code.

### Using yarn

```
yarn add glob-promise --save
```

### Using npm

```
npm install glob-promise --save
```

## Add the getStaticPaths function

Create a `getStaticPaths` function (annotated below) in `[slug].js` that looks like the following:

```js
import glob from 'glob-promise';
import path from 'path';

export const getStaticPaths = async () => {
  // Our Markdown files are stored in the posts/ directory
  const POSTS_DIR = path.join(process.cwd(), 'posts');

  // Find all Markdown files in the posts/ directory
  // With The glob-promise library, we can use a one liner to find our Markdown files
  const postPaths = await glob(path.join(POSTS_DIR, '**/*.md'));

  // For each filename, the slug is the filename without the .md extension
  const paths = postPaths.map((postPath) => {
    const slug = path.basename(postPath, path.extname(postPath));
    return { params: { slug } };
  });

  // Return the possible paths
  return { paths, fallback: false };
};
```

Next, we need to read the Markdown file when the user visits a blog post route.

# Read your Markdown files with Markdoc

Similar to how Next.js automatically supports `getStaticPaths` function, Next.js also supports an exported `getStaticProps`. We will use the `getStaticProps` function to pass the blog post data to the React component, so we can show the user the blog post. We add the `getStaticProps` function in the same `[slug].js` file that we have been working on.

```js
// ... imports from the last step here ...
import Markdoc from '@markdoc/markdoc';
import fs from 'fs';

// This config tells Markdoc to look for our Paragraph React component (to be created in another step)
const config = {
  nodes: {
    paragraph: {
      render: 'Paragraph',
    },
  },
};

export const getStaticProps = async (context) => {
  // Our Markdown files are stored in the posts/ directory
  const POSTS_DIR = path.join(process.cwd(), 'posts');

  // Generate the local Markdown path from the URL slug
  const {
    params: { slug },
  } = context;
  const fullPath = path.join(POSTS_DIR, slug + '.md');

  // Read the Markdown file contents
  const source = fs.readFileSync(fullPath, 'utf-8');

  // Use Markdoc to create a tree of tokens based on the Markdown file
  const ast = Markdoc.parse(source);

  // Create a renderable tree
  const content = JSON.stringify(Markdoc.transform(ast));

  // Return the content as a prop to the React component for now
  // We will render the content in the next section
  return {
    props: {
      content,
    },
  };
};
```

# Render your Markdown in a React component

We will add our last piece of code in the same `[slug].js` file which will return a React component. As part of Next.js, we can `export default` a React component, and Next.js will render that React component for us. Our React component uses `Markdoc.renderers.react(...)` to convert the renderable tree into a React element.

```js
// ... other imports here ...
import React from 'react';

// Return our custom Paragraph component that adds custom Tailwind classes
const components = {
  Paragraph: ({ children }) => {
    return <p className="leading-relaxed mb-8 text-lg">{children}</p>;
  },
};

// Create a React component using Markdoc's React renderer and our list of custom components.
const BlogPostPage = (props) => {
  const { content } = props;
  const parsedContent = JSON.parse(content);

  return (
    <div>
      {Markdoc.renderers.react(parsedContent, React, {
        components,
      })}
    </div>
  );
};

export default BlogPostPage;
```

# Render a list of your posts

Finally, we need to render a list of your posts when your users go to `/blog`.

Create a new file, `pages/blog.js`. Remember, Next.js will automatically set up the routing for `/blog` since the new file was created under the `pages/` directory. Once again, Next.js will render the default exported React component that gets returned from `pages/blog.js`.

## Install gray-matter

Install the `gray-matter` package so we can extract the title from the Markdown metadata.

### Using yarn

```
yarn add gray-matter --save
```

### Using npm

```
npm install gray-matter --save
```

## Install dates-fns

Install the `date-fns` package to make it easier to format dates.

### Using yarn

```
yarn add date-fns --save
```

### Using npm

```
npm install date-fns --save
```

Here is the final `pages/blog.js` file with an explanation of the lines.

```js
// ... add imports if they haven't been added yet ...
import Link from 'next/link';
import { format } from 'date-fns';
import fs from 'fs';
import glob from 'glob-promise';
import matter from 'gray-matter';
import path from 'path';

export const getStaticProps = async () => {
  // Find all Markdown files in the /posts directory
  const POSTS_DIR = path.join(process.cwd(), 'posts');
  const postPaths = await glob(path.join(POSTS_DIR, '**/*.md'));
  const posts = postPaths.map((postPath) => {
    const slug = path.basename(postPath, path.extname(postPath));
    const source = fs.readFileSync(postPath, 'utf-8');

    // Use gray-matter to fetch the data between the `---` at the top of our Markdown files.
    const matterResult = matter(source);
    const { title, date } = matterResult.data;

    return {
      title,
      date,
      slug,
    };
  });

  // Sort the posts by date
  const sortedPosts = posts.sort((a, b) => b.date - a.date);

  // We need to format the dates into strings because Next.js expects the props to be serializable as JSON.
  const parsedDatePosts = sortedPosts.map((post) => {
    return {
      ...post,
      date: format(post.date, 'MM/dd/yyyy'),
    };
  });
  return { props: { posts: parsedDatePosts } };
};

const Blog = (props) => {
  const { posts } = props;
  return (
    <div>
      {posts.map((post, i) => {
        return (
          <div key={i}>
            <Link href={'/blog/' + post.slug}>
              <a>
                <h1>{post.title}</h1>
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Blog;
```

# Conclusion

You can start up your project locally by running `yarn dev`.

Visit `https://localhost:3000/blog`, and you'll see a list of blog posts. In this case, we only have one blog post. If you click on the name of the blog post, you will go to the full blog post.

You have achieved the ultimate victory. You now have a blog created using Next.js and Markdoc.

I have created a repo that you can clone use as a playground: [Next.js and Markdoc example](https://github.com/docploy/nextjs-markdoc).

If you have any questions, reach out to me at charlie[at]docploy.com or send a message to me at [@docploy](https://twitter.com/docploy) on Twitter.
