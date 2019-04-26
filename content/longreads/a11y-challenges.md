---
path: "/a11y-challenges-of-webapps"
teaser_title: "What makes web apps special?"
title: "What are the accessibility challenges when building web apps?"
intro: 'Web applications aim to emulate the experience of native apps by loading and displaying data in an asynchronous fashion ("AJAX"). This lack of full page reloads makes it hard for users of screen readers.'
type: 'challenges'
---

A web application is a computer program that runs in your browser. It is hard to expand the general definition further. Wikipedia says:

> The general distinction between a dynamic web page of any kind and a "web application" is unclear. Web sites most likely to be referred to as "web applications" are those which have similar functionality to a desktop software application, or to a mobile app.

But regardless of whether it's a dynamic web page or a single page application - modern "app-like" functionality is built with JavaScript (sometimes with a framework) and this JavaScript should work (and be accessible) for everyone.

Maybe you read in the past that JavaScript is bad for accessibility. While it's always good to build digital products with progressive enhancement in mind some web projects simply can not be made accessible ***without*** JavaScript.

Now, what are the specific problems that come with JavaScript?

## Click targets that are not only links

I'll admit that that headline is a simplification. Of course, even on "non-dynamic web pages" there a more click targets than links. Take a submit button or input elements in forms for example.

The reality is, however, that many web pages offer click targets that are only that - **click** targets. Neither can you reach them or interact with them via keyboard nor use them with assistive technologies such as screen reader or voice input software. And why? Because, often times the code looks something like this

    <span @click="someClickHandler">To be or not to be a button</span>

While you *can* assign a click handler to any element that doesn't mean that you *should.* What you should do is using the (maybe boring but powerful) `<button>` element. Why?

- Buttons are recognizable as interactive elements by all user agents - regardless of whether the web document is perceived visually, auditory or else. It's the Swiss army knife of interaction elements on the web, especially when you use `<button type="button" />` to clarify you don't want this button to submit any form by accident. If you wanted to "upgrade" your span to a button - but only regarding its perception, not its functionality - you would need to add `role="button"`.
- Buttons are by default focusable with the keyboard (if you wanted to make our "span button" focusable you would have to add `tabindex="0"`.
- Buttons can be activated by click or touch, but also by ENTER or SPACE keystrokes. So no need to register extra event listeners. Adding a listener on click is fine, ENTER or SPACE keystrokes will be relayed.

### But the styling

Maybe the aversion to buttons has to do with their default styling. It differs from browser to browser and from operating system to operating system, and giving them a coherent styling used to be hard. But that is not the case anymore. Just apply:

    button {
    	-webkit-appearance: none;
    	margin: 0;
    	padding: 0;
    	border: none;
    	border-radius: 0;
    	font: inherit;
    	color: inherit;
    	background: none;
    }

### But I could use a link with href="#" to achieve the same thing

In order to decide whether to use an `<a>` or `<button>` ask yourself: does interacting with that element navigate to a new place (including a change of URL), or does it change something on the page you are on (for example: opening a modal dialog, liking a status on a social media platform, adding an item into your online shopping cart).

In case of navigation, use a link. In case of modification, use a button.

## Inputs and Controls

A central part of a typical web app is usually to input data - you enter texts, upload files, make selections, check boxes, rearrange things and the like.

Actually, building an inclusive web app means that anyone could do all these things mentioned above - regardless of what technology they use. Be it a visual browser and a mouse, a switch device, a braille reader that makes user perceive your app in a tactile way - or a screen reader that transforms it to an auditory experience.

The creators of the web have built "input primitives" that cover many input cases - and you already know them. While making your app accessible, ask yourself - can I solve my case by using a text input, textarea, select or multi-select, or checkbox? If your answer is - yes, but they should not look "primitive" – be aware that styling them with CSS only has gotten easier and simpler over the last years. Visit sites like [wtfforms.com](http://wtfforms.com/) to update your knowledge about what has become possible, if necessary.

But even for the cases an "input primitive" does not suit your needs the web standard creators have you covered – with ARIA (which stands for: Accessible Rich Internet Applications). Regarding input and controls, Wikipedia describes it as follows:

> These user interface controls [...] are often not accessible to users with disabilities, especially screen reader users and users who cannot use a mouse or other pointing device. WAI-ARIA allows web pages (or portions of pages) to declare themselves as applications rather than as static documents, by adding role, property, and state information to dynamic web applications.

WAI-ARIA has been around for a while and if you want to look into recommended approaches please check [ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/), or the skim through its [FAQ](https://www.w3.org/WAI/ARIA/faq) (Frequently Asked Questions) to give yourself a general overview. 

## AJAX  - Changing and loading things asynchronously

Web apps try to emulate native apps also regarding their reactivity after some user input. Where a "standard" website would load (anew) after an interaction happend (e.g. with a link or submit button) web apps use an approach dubbed AJAX some time ago. Meaning: asynchronously fetching or storing data without triggering a webpage reload.

As a consequence a web app using AJAX feels "snappy", just like its paragon, the native app. Unfortunately this asynchronousity is rather bad for assistive technologies that consume a web document sequentially. Let's take a screen reader - its normal mode is to read the document from top to button (in reality no user uses it this way, but navigates via headline structure, landmarks, links, controls and the like). Given a screen reader user interacts with a button and, as a consequence, something happens in a web app said user has to actively search for what has changed on website.

### An example

Imagine an e-commerce site with "shopping cart" functionality - you browse to the site and can put products into your shopping basket. Let's say this process of "putting things into your cart" should feel *snappy* and is built with AJAX - so that the user is not redirected to their cart every time they put a product in it. So the user finds a product and clicks on the big "Add to cart" button. Subsequently the shopping cart widgets gets updated, maybe increasing a counter badge somewhere - in short: visually abled users can see that their button click lead to the desired result.

Our screen reader user just interacts with the "Add to cart" button - and then nothing obvious happens. Maybe it does, maybe a shopping cart widget somewhere else in the document is now populated - but maybe the interaction did fail. Unless the screen reader user actively searches for a possible change after button click they won't find out what happened. A very annoying and frustrating situation for them.

### Solution strategies

Luckily there are two strategies to avoid this annoyance:

- Moving focus programmatically after interaction. With a few exceptions focus shouldn't be explicitly moved but be predictable, so this has to be decided on a case to case basis. Often times the following option is better:
- Announcing the failure or success of the interaction with an ARIA live region. With live regions web developers can sprinkle a little asynchronousity into the screen reader experience - in the way that they can interrupt the reading in a polite or more assertive way. In our shopping cart example, a polite message that "Product A has been added to your shopping cart" could be the way. The screen readers virtual focus is not affected in any way – read: the user is still on the same spot in the document as before the interaction – but now they know that their button click actually did work. [You can learn more about live regions in MDN's detailed documentation of this great functionality that enables users of assistive technologies to have a way better web app experience](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions).

## Route changes

There is a very special type of web app: the Single Page Application (SPA). A SPA consists of one single HTML document (hence the name) - anything else is being loaded in an asynchronous way without ever really navigating off of the page. [Quote Wikipedia](https://en.wikipedia.org/wiki/Single-page_application):

> [A Single Page application] interacts with the user by dynamically rewriting the current page rather than loading entire new pages from a server. This approach avoids interruption of the user experience between successive pages, making the application behave more like a desktop application.

So SPAs are asynchronous beasts - therefore all the strategies regarding notifying user of client side changes apply - but there is one more peculiarity. Continue quote:

> The page does not reload at any point in the process, nor does control transfer to another page, although the location hash or the HTML5 History API can be used to provide the perception and navigability of separate logical pages in the application.

So Single Page Applications emulate changes of locations by modifying the location hash - to that navigating a SPA feels like navigating a "static page", but quicker and without any server configuration. This is called "routing".

And it is actually a topic for accessibility. Remember the e-commerce example from above -a user clicks on a button and is not provided with a response whether something happened after? The situation when it comes to routing is the same: a screen reader user interacts with a (routing) link - and nothing happens; although, in most cases, large parts of the page have changed.

### Best practices for accessible routing:

- This is one of the rare occasions where moving focus is recommended. Since the topic of accessible routing is rather new and research for a solid best practice is still ongoing - as of now it's unclear where exactly the focus should be sent to:
    - To the top of the document? If implemented this user experience would come close to the experience of a "real page load"
    - To the "routing container"? This would mean sending the focus to the element whose content has been exchanged.
    - To the first sensible headline of the newly loaded content? What is in favor of this approach is that the user lands directly in the requested content
- But regardless of the exact focus target - focus management after route transitions should have a certain delay to take loading times into consideration
- Also, it is best practice to change the document's title after a route change
- Last but not least: When focus management is just not enough to make the inner workings of your Single Page App transparent to your users (for example when external data needs to be fetched before it can be displayed, and focus moved), consider using a live area to inform users that their request was successful but your app needs a little bit more time.

## Conclusion

All in all, the specifics of web apps can be summarized in two points:

- Be very clear and transparent about the input options of your app. Remember that the visual representation of a user input is not enough. For example: What looks like a button should be a button *semantically* and not only a span with a click event listener. For edge cases, consult [ARIA Authoring Practice](https://www.w3.org/TR/wai-aria-practices-1.1/) (and [accessible-app.com](https://accessible-app.com), of course).
- Be very clear and transparent about the output of your app, especially when it its not accompanied with a full page reload, and especially when the output happened after some user input. Consult [WAI ARIA live region documentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) for accessible announcements and visit [accessible-app.com](http://accessible-app.com) once in a while to learn more about emerging best practices (and ready-made framework solutions) regarding accessible routing.
