---
path: /pattern/vue/notifications
title: Why visual announcements alone aren't enough
type: pattern
edittext: https://github.com/accessible-app/accessible-app_com/edit/master/content/patterns/vue/notifications.md
---

In a purely visual context notifying your web app's users of changes is more or less a no-brainer. They click a button and usually see something appearing, changing or animating: a modal window is opened, a counter badge is updated or a to do list item disappears. And even if the change is much more abstract you can solve this with a specialized notification system like [humane.js](http://wavded.github.io/humane-js/) or [toastr](https://codeseven.github.io/toastr/demo.html). Just throw a new "toast notification" (as they are sometimes called),

For users consuming your web app in a non-visual way the topic of announcements becomes harder. Let's take a screen reader for example - its normal mode is to read the document from top to bottom (in reality no user uses it this way, but navigates via headline structure, landmarks, links, controls and the like). Given a screen reader user interacts with a button and, as a consequence, something happens in a web app, and this something is either obvious for visual users or accompanied with a notification. The problem is - without a real accessible notification system in place said user has to actively search for what has changed on website.

### Best practice

A system like this does exist - in the form of so called ARIA live regions. [As MDN web docs put it](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions):

> Using JavaScript, it is possible to dynamically change parts of a page without requiring the entire page to reload — for instance, to update a list of search results on the fly, or to display a discreet alert or notification which does not require user interaction. While these changes are usually visually apparent to users who can see the page, they may not be obvious to users of assistive technologies. ARIA live regions fill this gap and provide a way to programmatically expose dynamic content changes in a way that can be announced by assistive technologies.

In a nutshell: If you add the aria-live attribute an element (visible or not) it will become a "notification container". Screen readers detect aria-live regions and read their content as soon as it changes. Therefore, you can use this announcement tool to provide hints that are visually apparent to screen reader users - for example, that one particular product has been added to their shopping cart after they interacted with a button labelled "Add to cart". These regions let web authors "break" the standard screen reader behaviour - that is: reading out a document and its items sequentially from top to bottom. A simple example:

1. Once your app mounts or your page loads you make sure that an element like the following exists (more on the values of the `aria-live` attribute below)

        <div id="info" aria-live="polite"></div>

2. Let's image have an online store that has a shopping cart and you
have a "Add to cart" button attached to each of your products. On click, this product will be added to the cart. This would be perceivable for
sighted users
3. Your click handler for aforementioned "Add to cart" button could look like this (just for the example only one button is present):

        document.querySelector('.add-to-cart').addEventListener('click', function() {
        // Your cart-adding business logic here
        // ...
        
        // Announcing success with aria-live
        document.getElementById('info').textContent = 'Product was added successfully to your shopping cart';
        });

4. Then, when a product gets added this is not only visually perceivable but also will be announced by screen readers. Usually, and using `aria-live="polite"`, the announcement will wait until the screen reader has finished its current output. In the rare cases you need to report a critical error and cannot wait (read: cannot be polite), use `aria-live="assertive"`. As soon as your live regions' content changes (from empty to not empty, in this case) it will be announced (if you are, like me, not a native English speaker and use the word "assertive" rarely in your everyday life - just look at its
first three letters; then you know you got the counterpart to "polite"
😉).

This is a very low key introduction to aria-live which only scratched the surface.  If you want to learn more about aria-live regions in general, visit [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions).

### Using that best practice in Vue

[Vue-announcer](https://github.com/vue-a11y/vue-announcer) is a plugin that wraps aria live notifications and lets web developers use them a way that's familiar to them:

    this.$announcer.set("This is the announcement");

This leads to the following code behind, e.g. the "Clear all items" button in the shopping cart of the example app:

    removeAllItems() {
      store.commit("removeAllShoppingCartItems");
      let message = `Shopping cart is now empty`;
      this.$announcer.set(message);
    }

Using aria-live regions (politely) in this case, screen reader users can now be actively notified of the success of their recent interaction (button click) without having them to search for changes in the document - just as sigthed users can perceive a change in the counter bubble attached to the Shopping Cart menu.

[Visit vue-annoucement's GitHub repository for more information on installation, configuration and usage](https://github.com/vue-a11y/vue-announcer).

### Examples

- [Placement of the `<vue-announcer />` custom element within the example app, Accessibooks](https://github.com/accessible-app/vuejs/blob/master/src/App.vue#L9)
- [Announcement fired once the contents of Accessibook's shopping cart changes](https://github.com/accessible-app/vuejs/blob/master/src/components/ShoppingCartButton.vue#L24)

### Summary

- Use [vue-announcer](https://github.com/vue-a11y/vue-announcer)
