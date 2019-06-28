---
path: /pattern/vue/menu
title: Menus & Dropdowns
type: pattern
edittext: https://github.com/accessible-app/accessible-app_com/edit/master/content/patterns/vue/menu.md
---
Heydon Pickering open his [inclusive-components article on menus and menu buttons](https://inclusive-components.design/menus-menu-buttons/) with: 

> Classification is hard

And he's incredibly right about that. In order to add accessible menu buttons and menu constructs to your web-app it is necessary to put the expression "menu" and "application" in context.

### Menus and Dropdowns

Menus are known from your operating system. On the desktop their are mostly at the upper edge of your application chrome on Windows, or fixed at the upper edge of your screen if you use Mac OS. A dropdown is mostly the container that appears when you click the first level, like "File" and "Edit". If you click on something inside that dropdown, for example "Undo" it triggers an action in your application.

In web design, on the other hand, the expression "menu" and "dropdown" are often used differently: a menu could be a horizontally displayed list of links and the dropdown could contain further links in a navigation section, this time possibly displayed vertically.

### Applications

When you do your research about building your web-app with accessibility in mind and reach [WAI-ARIA Authoring Practices (AP)](https://www.w3.org/TR/wai-aria-practices-1.1/) and its patterns you will stumble over the expression "application". Please consider that the authors of the AP could have had something else in mind when the wrote it that you, a Vue, React or Angular developer. The practices frequently use the "application" term for desktop-like application. It is for you as the web-app author to judge whether you are building something desktop like - of if you rather make some links to routes, inputs or buttons visible, items appear or disappear after an user interaction.

One further issue about "application" in the sense of ARIA is that screen readers have an "application mode". Once this mode is activated by an ARIA attribute that triggers it, application mode changes usage patterns and keyboard shortcuts. Since we are still talking about a web-app you really have to check if this rather brutal change of input mode is intentionally the the thing you are aiming for.

The tip here is, as well as in general with accessibility advice: Test with real users.

### Best practice

    <button aria-expanded="false" aria-controls="someid">Account</button>
    <div hidden id="someid">
        <ul>
            <li><a href="/orders" >Past Orders</a></li>
            <li><a href="/settings">My Settings</a></li>
        </ul>
    </div>

The best practice is to keep it simple, think hard about if the menu you're about to build is a true "[action menu](https://www.w3.org/TR/wai-aria-practices-1.1/examples/menu-button/menu-button-actions.html)". If it's not or if you are in doubt solve your menus with a construct like the one above. It consists of two basic parts:

- A trigger button that triggers the visibility of the dropdown
- The dropdown itself, containing links, buttons and other pieces of information

The button uses `aria-expanded` to communicate if the dropdown is visible or not. In other words (in this case, [the ones from W3C's Web Accessibility Initiative](https://www.w3.org/WAI/PF/aria/states_and_properties#aria-expanded)):

> ...indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.

You may have discovered the `aria-controls` attribute that points to the `id` attribute of the dropdown container. In theory this is the programmatic glue that communicates to assistive technology that button and dropdown container are connected. In reality though the attribute is only supported by the JAWS screen reader. This means you have to clarify this connection differently and the only sensible way left is focus. Once keyboard focus or the virtual cursor of a screen reader is on the button (and it communicates its state to the assistive tech, collapsed or expaned, more on that in the next paragraph) - the next item you expect to gain focus is the first interactive item of your dropdown. This could be achieved by...

1. ...just placing the dropdown container below the button in the DOM. If this turns out not to be possible... 

2. ...you have to make sure that you manage focus programmatically. 

But since this is a simple code example I assume that this is the ideal situation, scenario 1. Also, it does not hurt to use `aria-controls` nevertheless - just remember that you can't rely on it in every screen reader.

Further up in this text it is mentioned that one should avoid to force a screen reader into application mode by accident. One of the ways of doing this is using `aria-haspopup` on the button. It looks rather innocent and like an indicator that, well, this particular button has a popup, dropdown or the like. But what it really does is to force the screen reader into application mode once the button is expanded. In an application menu (or action menu) a user expects certain keyboard functionality. You may not have implemented it - because you were not aware of triggering it the first place. So please use `aria-haspopup` with extreme caution and only in true action menus.

### Using that best practices in Vue

If you have looked into the code example above closely you may have encountered the following "moving parts" of your Vue menu component:

- the button's `aria-expanded`
- the dropdowns `hidden`attribute
- the ID of the dropdown that has to be referenced in the button's `aria-controls`attribute

[Please have a look into Accessible App's demo app Accessibooks to find a way to solve this:](https://github.com/accessible-app/vuejs/blob/master/src/components/Menu.vue)

- The id is generated once the component has been mounted
- A general state of "open" has been established in the component's data property. It defaults to false and is changed on button click
- The value of aria-expanded is depending on said state: `:aria-expanded="open.toString()"`
- The existence of `hidden`on the dropdown is also dependent on "open": `:hidden="!open`

### Further links
* [Adrian Roselli's detailed write-up on "Link + Disclosure Widget Navigation"](http://adrianroselli.com/2019/06/link-disclosure-widget-navigation.html)
* [The story about how this very pattern of accessible app came to be](https://marcus.io/blog/menu-or-not)
* [Please make sure you read all the replies to Dave Rupert's retweet of above mentioned article](https://twitter.com/davatron5000/status/1143545648849006592)
