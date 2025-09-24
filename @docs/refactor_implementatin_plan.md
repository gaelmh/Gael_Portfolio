# Refactoring Plan: From GitHub Pages to Vercel with Next.js

This document outlines the plan to refactor the existing portfolio website, currently based on static HTML and CSS, into a modern Next.js application hosted on Vercel.

## 1. Project Setup

*   **Initialize Next.js App:** A new Next.js application will be created in the project root. This will set up the necessary file structure and dependencies.

## 2. Componentization (OOP Principles)

The existing `index.html` will be broken down into reusable React components to promote modularity and maintainability.

*   **`Header` Component:** This will encapsulate the main navigation bar.
*   **`Hero` Component:** This will contain the "About Me" section.
*   **`Projects` Component:** This component will be responsible for displaying the portfolio projects. It will likely involve a sub-component for individual project cards.
*   **`Contact` Component:** This will house the contact information.
*   **`Footer` Component:** This will encapsulate the footer section of the page.

## 3. Styling

*   **CSS Migration:** The styles from the existing `style.css` file will be moved into a global stylesheet within the Next.js `app` directory to maintain the current look and feel of the portfolio.

## 4. Asset Migration

*   **Move Images:** All images currently in the `Images` directory will be relocated to the `public` folder within the Next.js project structure. This is the standard convention for serving static assets in Next.js.

## 5. Routing and Rendering

*   **Page Assembly:** The newly created components will be imported and assembled within the main `app/page.tsx` file to construct the single-page layout of the portfolio.

## 6. Cleanup

*   **Remove Legacy Files:** Once the Next.js implementation is verified to be working correctly, the original `index.html` and `style.css` files will be removed to avoid confusion and complete the refactoring process.

## Future Backend Integration

This refactoring will lay the groundwork for future backend development using Node.js. The component-based architecture will make it easier to integrate with a backend API for dynamic content and features.