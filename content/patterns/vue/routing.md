---
path: /pattern/vue/routing
title: An accessible routing pattern
type: pattern
edittext: https://github.com/accessible-app/accessible-app_com/edit/master/content/patterns/vue/routing.md
---

### Why routing is an issue

Routing is an integral part of a Single Page Application (SPA), and therefore for the [accessible-app.com](http://accessible-app.com/) project. But let's take a step back and define this term: A SPA consists of one single HTML document (hence the name) - anything else is being loaded in an asynchronous way without ever really navigating off of the page. [Quote Wikipedia](https://en.wikipedia.org/wiki/Single-page_application):

> [A Single Page application] interacts with the user by dynamically rewriting the current page rather than loading entire new pages from a server. This approach avoids interruption of the user experience between successive pages, making the application behave more like a desktop application.

So SPAs are asynchronous beasts - therefore all the strategies regarding notifying user of client side changes apply - but there is one more peculiarity. Continue quote:

> The page does not reload at any point in the process, nor does control transfer to another page, although the location hash or the HTML5 History API can be used to provide the perception and navigability of separate logical pages in the application.

So Single Page Applications emulate changes of locations by modifying the location hash - to that navigating a SPA feels like navigating a "static page", but quicker and without any server configuration, or actually hitting HTML documents in subfolders. This is called "routing".

Now imagine an user interacting with your app in a non-visual way. Changing routes may be obvious to those who are visually abled - but they are invisible for those who are not and use a screen reader. Assistive technologies like that consume a web document sequentially. The normal mode of operation is to read the document from top to button (in reality no user uses it this way, but navigates via headline structure, landmarks, links, controls and the like). So a screen reader user interacts with a link that leads to another route - but the the reader stays silent, although the route transition has worked. But said user has to actively search for what has changed on website in order to find out.

### Best practice

This is one of the rare occasions where programmatically moving keyboard focus is recommended. Since the topic of accessible routing is rather new and [research for a solid best practice is still ongoing](https://marcysutton.com/prototype-testing-accessible-clientside-routing/) - as of now it's unclear what is actually the best place the focus should be sent to:

- To the top of the document? If implemented this user experience would come close to the experience of a "real page load"
- To the "routing container"? This would mean sending the focus to the element whose content has been exchanged.
- To the first sensible headline of the newly loaded content? What is in favor of this approach is that the user lands directly in the requested content

But regardless of the exact focus target - focus management after route transitions should have a certain delay to take loading times into consideration. You don't want to set focus on a container that is empty at the time of focus change. 

Please have in mind to change the document's title after a route change.

On the occasions when focus management is just not enough to make the inner workings of your Single Page App transparent to your users (for example when external data needs to be fetched before it can be displayed, and focus moved), consider using a live area [see pattern] to inform users that their request was successful but your app needs a little bit more time.

### Using that best practice in Vue

When you look across the framework pond how React (or its plugins) solve this, you will stumble upon the "[Reach Router](https://reach.tech/router)" project. It takes care of the managing focus part by manually setting the focus to the container of the newly loaded contents. This is great, but for a flexible Vue routing approach, let's make it configurable where focus is being sent to exactly. You should be able to send the focus for example to a headline within the loaded content ([as Google's Rob Dodson summarizes it concisely](https://dev.to/robdodson/managing-focus-64l), or [simplyaccessible.com](http://simplyaccessible.com/) explains this in detail using Angular). To have routing functionality in the first place we are going to use [vue-router](https://github.com/vuejs/vue-router/), of course.

#### Defining a focus target

We can mark the node where we will send the focus onto after route transition with a reference. Meaning: putting the `ref` attribute on it and then accessing it ([learn more about accessing the DOM with $refs here](https://codingexplained.com/coding/front-end/vue-js/accessing-dom-refs)). For example:

    <h2 ref="focusTarget">Focus me</h2>
    // Get the element in Vue with this.$refs.focusTarget

Now that we got the reference to the focus target we must find out when a route transition happened, and hook into that event. You can use a watcher for this. But you have to make sure that you wait for the DOM to have actually changed. This is what [Vue.nextTick](https://vuejs.org/v2/api/#Vue-nextTick) is for:

    new Vue({
        router,
        watch: {
            $route: function() {
                this.$nextTick(function () {
                // $nextTick = DOM updated
    
                });
            }
        }
    }).$mount('#app');

#### Wait for it...

One other thing is to add a delay before running the actual focus code. [This apparently stems from Voice Over failing to set focus on changed DOM nodes in iOS 7 and earlier](http://dylanb.github.io/bower_components/a11yfy/examples/focus.html). Although this appears to be fixed in Version 8 - since I can find new information on the topic, I'll add a delay.

Now for the central focus part. At first, we're looking for the focusTarget ref. If your route watcher can't find it, our focus target will be the container where content will be loaded into after route transition. Vue Router calls it `<router-view>`. To make this fallback easier to grab, we will add a reference to the router view like this:

    <!-- Here be <router-links />'s -->
    <router-view ref="routerView"></router-view>

But back to JavaScript:

    // Get component's "routeFocusTarget" ref.
    // If not existent, use router view container itself
    let focusTarget =
        (this.$refs.routerView.$refs.componentFocusTarget !== undefined)
            ? this.$refs.routerView.$refs.componentFocusTarget
            : this.$refs.routerView.$el;

Before we finally can set focus on the focus target we actually have to make sure that we can set focus programmatically to it (because usually, just interactive elements like buttons, links, or form inputs are focusable).

    focusTarget.setAttribute('tabindex', '-1');

GDS, the team behind the website [gov.uk](http://gov.uk/) has discovered that a "stray" tabindex on a wrapping container in their case, the <main> element, which was a hack around a browser bug anyway, could cause some issues. Therefore, we're removing the tabindex directly after  setting focus:

    // Focus element
    focusTarget.focus();
    
    // Remove tabindex from focustarget.
    focusTarget.removeAttribute('tabindex');

#### Putting it all together

The following demo will be a CodePen with all of the parts mentioned put together. In this example, the "route target" components are very simple - two of them have their componentFocusTarget explicitly set to their first headline, one of them to their general
container DOM node, and one of them has no such ref at all. But in any case - focus is being dealt with after a route change. For debug and display purposes the focus is made visible via red border.

[https://codepen.io/marcus/pen/WYEypM](https://codepen.io/marcus/pen/WYEypM)

#### Outlook

Eduardo San Martin Morote, core maintainer of vue-router, is aware of Reach Router's approach and interested to implement focus management into the Vue routing plugin itself. So hopefully this article will be updated in the near future - since it won't be necessary to use a watcher and programmatically set focus, because vue-router just handles this for you. For anyone interested staying up to date: [Subscribe to issue #2488 on vue-router's GitHub repo](https://github.com/vuejs/vue-router/issues/2488).

### Examples

- [Routing configuration of the example app](https://github.com/accessible-app/vuejs/blob/master/src/router.js) and [route transition watcher](https://github.com/accessible-app/vuejs/blob/master/src/App.vue#L57) in Accessible App's example application, [Accessibooks](https://vuejs.accessible-app.com)
- [CodePen demo with focusTarget approach](https://codepen.io/marcus/pen/WYEypM)

### Summary

- Use [vue-router](https://github.com/vuejs/vue-router/)
- Change focus to the new content after route transition, but only after the new content is actually available.
