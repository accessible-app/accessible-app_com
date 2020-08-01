---
path: /pattern/vue/progress
title: Showing progress
type: pattern
edittext: https://github.com/accessible-app/accessible-app_com/edit/master/content/patterns/vue/progress.md
---

### Why this is worth noting
A frequent feature of a web-app is to load data asynchronously, e.g. from an internal or external API, or database. This leads to loading states that you, I assume, convey visually with nicely animated progress bars. This is all well and fine for users who use your application visually, but can lead to screen readers just remaining silent. In these loading states, nothing obvious happens for them. Let's find a strategy to change that.

### A possible solution

The logical first step is to search for an HTML element that helps us transport our message in a semantic way. What we find is the `<progress>` element, which, by <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress">MDN's definition</a>...

> ...displays an indicator showing the completion progress of a task...

Nice, exactly what we were aiming for. Further research shows that authors should use the following attributes to supply further meaning and information to screen readers:
* `aria-valuemin` is the minimum value, the – so to speak – starting point of the progress
* Whereas `aria-valuemax` is the end value
* To convey current progress to screen readers, use `aria-valuenow` and update it automatically

#### Enhancing the progressbar

So we're done here, right? Wrong. Using `progress` element alone is not the *worst* thing you could do, but there are always way to improve. If you think, for example, that the presence of a `<progress>` bar alone leads to automatic screen reader output, when it updates – nope, that is not the case. A screen reader's virtual cursor has to be placed on the progressbar in order to hear its information. One way to ensure that is focus management. Therefore, we have to add `tabindex="-1"` to the element. This makes sure that focus can be set on the element via JavaScript (and this is exactly what we're planning to do), but prevents it from being reachable manually (e.g. via keyboard or similar devices). The final addition of `role="progressbar"` seems redundant at first, but is because of the JAWS screen reader, which otherwise does not recognize the element as a progressbar. In total, this leads to the following code for a progressbar that its progress on the range of 0% to 100%:

```
<label for="loading">Progress:</label>
<progress 
    id="loading" 
    value="42" 
    aria-valuemin="0" 
    aria-valuenow="42" 
    aria-valuemax="100" 
    max="100" 
    role="progressbar" 
    tabindex="-1"
>42%</progress>
```

That's a mouthful. But one of the advantages of modern, component-based JavaScript is the possibility to hide all this behind a nice little component, and only use the smallest set of props, for example:

```
 <label for="loading-progress">Loading progress:</label>
 <ProgressBar id="loading-progress" :value="value" />
```

This would – and will – be the code in Vue.js. One could even design this component a little bit more concise, using the label text as a prop and putting the label element in the ProgressBar component itself, but that is a topic for another article.

#### Dealing with focus management

To setup a sensible focus management, imagine the following exemplary user flow:
- A user clicks a button, thus triggers a loading/fetching sequence
- While this button disappears, a progress bar component will be shown. This component will be dynamically updated
- When the loading succeeds the progress bar disappears and the loaded content is finally shown

Now, it would be resonable to establish the following focus flow, helping screen reader and keyboard-only users:

<div id="videodesc">

- After the interaction with the "load more" button focus goes to the progress bar (which has been made focussable, see above)
- While focus is on the progress bar the current progress will be read out in screen readers. This way, their users are informed about the current state of the pause
- After the loading is complete, the progress bar if full, and it disappears. In order to not lose focus at the same time, focus will be transmitted to the newly loaded content, or its container, right before.

</div>

<div class="u-videoembed"><iframe title="YouTube video showing the visual focus flow" aria-describedby="videodesc" width="560" height="315" src="https://www.youtube.com/embed/jyEdBp4c7HA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

This video shows what is described above. I visualized the focus with a special indicator (this indicator is also available in the <a href="http://vuejs.accessible-app.com">Vue demo app as</a> "Accessible App Debugging" mode).

### Using that strategy in Vue

We start with the component itself (<a href="https://github.com/accessible-app/vuejs/blob/master/src/components/ProgressBar.vue">See the source code</a>). In it, `min`, `max` and `value` are props, whereas only the latter is mandatory (since it conveys the current progress), and `min` and `max` can default to 0 or 100, respectively.

Then we look at the component or page that uses the progress bar. This part of the code should actually start some form of loading progress (or other interstitial state). In the case of the demo app, this is the <a href="https://vuejs.accessible-app.com/#/orders">past order page</a>, and we're faking a database lookup of one's past orders.

If you look into the relevant component, [`Orders.vue`](https://github.com/accessible-app/vuejs/blob/master/src/views/Orders.vue) you will find the following things:

- Some `$refs`. The one on the `<h1>` is part of the <a href="/pattern/vue/routing">accessible routing</a> and existed before, but we're also referencing the container where we'll eventually send the focus to (when the progressbar has done its job and disappars. Note also the `tabindex="-1"` on said container. Without it, it would not be focusable with JavaScript)
- Hiding and showing with `v-if` directives, partly for demo reasons, partly to react, when state is updated and our fake database query is finished
- Most importantly, we're passing the current "state of the upload" via prop to the `<ProgressBar>` component. Fetching or querying is faked here with a simple setInterval.
- The actual focus setting is done via `§refs` (see above), and with both `Vue.$nextTick` callbacks and a certain delay for screen readers (around 1000ms is usually recommended).

### Examples
- <a href="https://vuejs.accessible-app.com/#/orders">The example app's order page. Click on "Click here to query our database for your past orders"</a>
- <a href="https://github.com/accessible-app/vuejs/blob/master/src/components/ProgressBar.vue">Source code of the ProgressBar component</a>
- <a href="https://github.com/accessible-app/vuejs/blob/master/src/views/Orders.vue">Source code of the "Orders" view</a>

### Summary
- Use a progress bar with all necessary attributes (`role="progressbar"` for JAWS, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`)
- Make the progressbar programmatically focusable with `tabindex="-1"`
- Create a focus management strategy that makes sense in your particular app. Ensure focus will be set to the progressbar, and make sure focus is not lost after successful loading (or whatever you created the interstitial view for).
