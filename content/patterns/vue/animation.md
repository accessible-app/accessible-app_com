---
path: /pattern/vue/responsible-animation
title: Responsible Animation
type: pattern
edittext: https://github.com/accessible-app/accessible-app_com/edit/master/content/patterns/vue/animation.md
---

To make the user experience pleasant and - above all - more app-like web-app authors use not only the strategy of asynchronous loading data but also animation. While the user experience of your app could benefit from it (see: ["How Functional Animation Helps Improve User Experience"](https://www.everyinteraction.com/articles/functional-animation-helps-improve-user-experience/)) sudden movements could cause, for example, dizziness, vertigo or nausea for some of your users suffering from a motion sensitivity such as [vestibular disorders](https://vestibular.org/understanding-vestibular-disorder):

> Imagine a world where your internal gyroscope is not working properly. Very similar to being intoxicated, things seem to move of their own accord, your feet never quite seem to be stable underneath you, and your senses are moving faster or slower than the rest of syour body.

*Source: A11y Project's [A primer to vestibular disorders](https://a11yproject.com/posts/understanding-vestibular-disorders/)*

### Best practice
#### User query

Luckily there is a new CSS media query ([which gains traction regarding browser suppport](https://caniuse.com/#search=prefers-reduced-motion)): `prefers-reduced-motion`. For example in Apple's MacOS and iOS user can enable this setting on an operating system level (*System Settings - Accessibility - Display*) - which let CSS authors detect this user preference:

```CSS
@media (prefers-reduced-motion: reduce) {
    /* Disable animation on your selectors here */
}
```
#### Add an off switch for animation

But to create an accessible experience in your app even to users are using a OS that does not offer this setting, web app authors should use the pwoer of their material: managing state. You could establish a setting regarding animations in your app that mimics `prefers-reduced-motion` and could be applied to our app's `<body>` element. So, if set to true, and therefore present on the body element the following selector would work:

```CSS
body.user-prefers-reduced-motion-reduce {
    /* Disable animation on your selectors here */
}
```

### Using these best practices in Vue

Both described ways are part of [https://vuejs.accessible-app.com](https://vuejs.accessible-app.com). If you are on a Mac and want to try it out, head to your OS's System Settings, go to "Accessibility", then "Display" and set the "Reduce motion" checkbox. If you happen to use a system without a setting like this you can go to the settings page inside the app: Click the Account button, then go to "My settings". Over there you will find - not very much, actually - but a checkbox labelled "Disable animations". Code-wise checking it adds `.user-prefers-reduced-motion-reduce` to the body.

Now that we know about activation let's look into the way of actually disabling animations, and it's straight-forward:

```CSS
@media (prefers-reduced-motion: reduce) {

  * {
    animation: none !important;
    -webkit-animation: none !important;
  }
}

.user-prefers-reduced-motion-reduce {

  * {
    animation: none !important;
    -webkit-animation: none !important;
  }
}
```

The "Accessibook" example app uses animations rather lightly:

- Once a modal window is opened
- Once you click on one of the menu buttons (Shopping Cart, Account)

But with either `.user-prefers-reduced-motion-reduce` or `prefers-reduced-motion: reduce` set you will see that these animations disappear. Disabling these particular animations isn't the most compelling example - but hopefully it gets the idea across. An idea that one as a web app author should take note of "user queries" like prefers-reduced-motion and that you should offer a choice regarding your animations - independently from this media query's dissemination.

### Examples
- [Find the animation disabling CSS here](https://github.com/accessible-app/vuejs/blob/master/src/scss/utils/_a11y.scss)
- [How Vue's state manager, vuex, is used for syncing the animation preference across the app's views](https://github.com/accessible-app/vuejs/blob/master/src/store.js#L16)
- [How either prefers-reduced-motion of the user setting "even" disables Vue's `<transition />` component - because it uses CSS animations](https://github.com/accessible-app/vuejs/blob/master/src/components/ShoppingCartMenu.vue#L4)
- [...and how the settings page works](https://github.com/accessible-app/vuejs/blob/master/src/views/Settings.vue)

### Summary
- Check for user queries like `prefers-reduced-motion: reduce`
- But offer a setting to disable all animations in your App's settings, nevertheless

