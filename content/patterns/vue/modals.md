---
path: "/pattern/vue/modal-dialogs"
title: "(Modal) dialog windows"
type: "pattern"
edittext: https://github.com/accessible-app/accessible-app_com/edit/master/content/patterns/vue/modals.md
---

### Dialogs vs Modals

A dialog box is a piece of UI that asks or requests the user for a response. This process of asking for the users' attention is non-obstrusive, they could ignore the request altogether. [As Brian Dys puts it](https://www.quora.com/Whats-the-difference-between-a-modal-and-dialog):

> The option to cancel the action is the same as ignoring the Dialog. And that makes it a Non-modal Dialog.

A modal dialog, on the other hand, requires a users' response and makes it mandatory to interact with it. Focus, both literally and proverbially, can't be moved away from the modal. That makes "modal" a type of dialog. Something is *a* modal (meaning: a modal dialog), or something is modal (meaning: blocking). Content "behind" a modal dialog is inert, which means de-activated for any interaction. Users that are presented with an open modal dialog must not be able to interact with inert content. Very often users who perceive your web app visually will see an half-transparent overlay over the inert content, but behind the dialog.

### Best practice

#### Placement of the modal in the DOM

As always, WAI-ARIA's [Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal) are a great resource on how to implement this abstract explanation into tangible code.

- At first, it is advised to distribute the role of either `dialog` (in case of non-modal dialogs) or `alertdialog` to the element that contains all elements of the dialog
- After that, you have to make sure that the keyboard focus is [trapped](https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element) within the modal dialog
- You have to supply at least two options to close the modal. One being a visible close button, the other being the ESC  key. Often times, a click on a modal overlay (the one that is more or less hiding, sometimes darkens inert content) closes it as well.
- Up until now, the (modal) dialog has no [accessible name](https://developer.paciellogroup.com/blog/2017/04/what-is-an-accessible-name/). We can solve that by using either `aria-labelledby` and referring to a present headline that will label the dialog, or `aria-label`. [Read more about both strategies at Accessibility Developer Guide](https://www.accessibility-developer-guide.com/examples/sensible-aria-usage/label-labelledby/).
- Finally, once the modal closes, keyboard focus must return to the triggering button.

Right now, we still lack a strategy to inform users of, e.g. screen readers, that once a modal is open, interaction and access should be limited to its content and interactions alone, and that navigating outside of the modal is prohibited. ARIA 1.1 has a solution for that -
placing `aria-modal="true"` on the dialog container. The theory is that this won't allow access to inert content. [In reality, there is a Webkit bug (affecting Voice Over on iOS and Mac](https://developer.paciellogroup.com/blog/2018/06/the-current-state-of-modal-dialog-accessibility/) which is preventing that using aria-modal suffices and becomes best practice.) So, for now, we have to rely on another strategy.

That strategy was actually a recommendation in ARIA 1.0, and it goes like this:

1. At first, once a modal is open, set `aria-hidden="true"` on the "background", meaning: The part of the site that you want to render inaccessible or inert
2. You have to make sure that your modal dialog element is not a descendant of said inert background, because once you apply `aria-hidden="true"` on an element, all of its content and children will be removed from the accessibility tree. The catch is: You can't markup exceptions from this, for example placing an element with `aria-hidden="false"` within it and expect it to somehow override the parents removal from the tree - [unfortunalety, that is not how it works.](https://stackoverflow.com/questions/21828152/nested-aria-hidden)

Which leads us to the required general markup (at least, for now):

    <!-- That's the desired state of the live DOM when the modal is active/open -->
    <div aria-hidden="true" inert>
    	<main role="main">
    	<p>content</p>
    </main>
    </div>
    <div aria-hidden="false" role="alertdialog" aria-labelledby="myModal-title">
    	<h1 id="myModal-title">Supermodal!</h1>
      ...
    </div>
    <!-- In short: Inert content and modals are siblings, not nested! -->

#### Characteristics of the modal window itself

An accessible modal dialog must have the following characteristics, according to the WAI-ARIA Authoring Practices:

- Adding `aria-role="dialog"` to the dialog's outmost wrapper
- The dialog has to have an [accessible name](https://developer.paciellogroup.com/blog/2017/04/what-is-an-accessible-name/), for example via `aria-labelledby="some-headlines-id"`
- Must close on overlay click and ESC keystroke
- Once open, must trap focus, after closing focus must be sent back to the activating button

### Using that best practice in Vue

The best practice for accessible modal dialogs consists of two parts: An easy implementation of portals and an easy implementation of the modal window itself.

The tool of choice for the first part is [vue-portal](https://github.com/LinusBorg/portal-vue), and it works like this:

    <portal to="destination"><p>This slot content will be rendered wherever the 
    	<code><portal-target></code> with name 'destination' is located.</p>
    </portal>
    
    <portal-target name="destination">
    	<!--
      This component can be located anwhere in your App.
      The slot content of the above portal component will be rendered here.
      -->
    </portal-target>

This means that you can "ship" a yet-to-be-selected dialog component in any other component we want ([look into the example app's `ProductTable` component for example](https://github.com/accessible-app/vuejs/blob/master/src/components/ProductTable.vue#L31)) - and still you place it "outside" (or better: neighboring) the content container. Like this:

    <some-wrapper>
    	<product-listing>
    	...
    	  <portal to="modals">
    			<fancy-dialog-thingy>Hello!</fancy-dialog-thingy>
    		</portal>
    	</product-listing>
    </some-wrapper>
    <portal-target name="modals">
    	<!-- <fancy-dialog-thingy /> will be rendered here! -->
    </portal-target>

The second part of the best practice is to choose a component for the (modal) dialog itself. Luckily accessible scripts like these are around, and one of them is Kitty Giraudel's [a11y-dialog](https://a11y-dialog.netlify.app/). Beside a [React variant of this script](https://github.com/KittyGiraudel/react-a11y-dialog) there is also a Vue wrapper called [vue-a11y-dialog](https://github.com/morkro/vue-a11y-dialog). You can use this script as it is since its build with the best practices (mentioned above) in mind - but be sure to to set the `disable-native` property to `true`, since it otherwise renders a native dialog element ([and this is not suitable to use in production as Scott O'Hara explains here](https://www.scottohara.me/blog/2019/03/05/open-dialog.html)).

### Examples

- [Placement of the portal region named "dialog" in Accessibook's high order `App` Component](https://github.com/accessible-app/vuejs/blob/master/src/App.vue#L33)
- [Usage of both portal-target and vue-a11y-dialog in a component](https://github.com/accessible-app/vuejs/blob/master/src/components/ProductTable.vue#L31)

### Summary

- Use [portal-vue](https://github.com/LinusBorg/portal-vue) when dealing with dialogs that are modal
- Use [vue-a11y-dialog](https://github.com/morkro/vue-a11y-dialog), `set disable-native="true"`
