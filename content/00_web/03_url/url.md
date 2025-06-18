---
title: "What is URL?"
slug: "00_web/03_url"
stack: "Web"
date: "2025-05-22T07:26:45.889Z"
draft: false
---

> A URL (Uniform Resource Locator) is the address of a unique resource on the internet. It is one of the key mechanisms used by [browsers](https://developer.mozilla.org/en-US/docs/Glossary/Browser) to retrieve published resources, such as HTML pages, CSS documents, images, and so on.

✏️ _In theory, each valid URL points to a unique resource. In practice, there are some exceptions, the most common being a URL pointing to a resource that no longer exists or that has moved. As the resource represented by the URL and the URL itself are handled by the Web server, it is up to the owner of the web server to carefully manage that resource and its associated URL._

### Anatomy of URL

Here are some examples of URLs:

```sh
https://developer.mozilla.org
https://developer.mozilla.org/en-US/docs/Learn_web_development/
https://developer.mozilla.org/en-US/search?q=URL
```

Any of those URLs can be typed into your browser's address bar to tell it to load the associated resource, which in all three cases is a Web page.

A URL is composed of different parts, some mandatory and others optional. The most important parts are highlighted on the URL below (details are provided in the following sections):

![Anatomy of URL](../../../src/images/00_web/w-13.png)

#### Scheme

![URL - Scheme](../../../src/images/00_web/w-13.1.png)

The first part of the URL is the scheme, which indicates the protocol that the browser must use to request the resource (a protocol is a set method for exchanging or transferring data around a computer network). Usually for websites the protocol is HTTPS or HTTP (its unsecured version). Addressing web pages requires one of these two, but browsers also know how to handle other schemes such as mailto: (to open a mail client), so don't be surprised if you see other protocols.

#### Authority

![URL - Authority](../../../src/images/00_web/w-13.2.png)

Next follows the authority, which is separated from the scheme by the character pattern `://`. If present the authority includes both the domain (e.g., `www.example.com`) and the port (`80`), separated by a colon:

- The domain indicates which Web server is being requested. Usually this is a domain name, but an [IP address](https://developer.mozilla.org/en-US/docs/Glossary/IP_Address) may also be used (but this is rare as it is much less convenient).
- The port indicates the technical "gate" used to access the resources on the web server. It is usually omitted if the web server uses the standard ports of the HTTP protocol (80 for HTTP and 443 for HTTPS) to grant access to its resources. Otherwise it is mandatory.

#### Path to Resource

![URL - Resource Path](../../../src/images/00_web/w-13.3.png)

`/path/to/myfile.html` is the path to the resource on the Web server. In the early days of the Web, a path like this represented a physical file location on the Web server. Nowadays, it is mostly an abstraction handled by Web servers without any physical reality.

#### Parameters

![URL - Path to Resource](../../../src/images/00_web/w-13.4.png)

`?key1=value1&key2=value2` are extra parameters provided to the Web server. Those parameters are a list of key/value pairs separated with the & symbol. The Web server can use those parameters to do extra stuff before returning the resource. Each Web server has its own rules regarding parameters, and the only reliable way to know if a specific Web server is handling parameters is by asking the Web server owner.

#### Anchor

![URL - Anchor](../../../src/images/00_web/w-13.5.png)

`#SomewhereInTheDocument` is an anchor to another part of the resource itself. An anchor represents a sort of "bookmark" inside the resource, giving the browser the directions to show the content located at that "bookmarked" spot. On an HTML document, for example, the browser will scroll to the point where the anchor is defined; on a video or audio document, the browser will try to go to the time the anchor represents. It is worth noting that the part after the **#**, also known as the **fragment identifier**, is never sent to the server with the request.

### How to use URLs

Any URL can be typed right inside the browser's address bar to get to the resource behind it. But this is only the tip of the iceberg!

The [HTML](https://developer.mozilla.org/en-US/docs/Glossary/HTML) language (see [Structuring content with HTML](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content)) makes extensive use of URLs:

- to create links to other documents with the [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a) element;
- to link a document with its related resources through various elements such as [`<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/link) or [`<script>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script);
- to display media such as images (with the [`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img) element), videos (with the [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video) element), sounds and music (with the [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/audio) element), etc.;
- to display other HTML documents with the [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe) element.

✏️ _Other technologies, such as CSS or JavaScript, use URLs extensively, and these are really the heart of the Web._

### Absolute URLs vs. relative URLs

What we saw above is called an absolute URL, but there is also something called a relative URL. The [URL standard](https://url.spec.whatwg.org/#absolute-url-string) defines both — though it uses the terms [absolute URL](https://url.spec.whatwg.org/#absolute-url-string) string and [relative URL](https://url.spec.whatwg.org/#relative-url-string) string, to distinguish them from [URL objects](https://url.spec.whatwg.org/#url) (which are in-memory representations of URLs).

Let's examine what the distinction between absolute and relative means in the context of URLs.

The required parts of a URL depend to a great extent on the context in which the URL is used. In your browser's address bar, a URL doesn't have any context, so you must provide a full (or absolute) URL, like the ones we saw above. You don't need to include the protocol (the browser uses HTTP by default) or the port (which is only required when the targeted Web server is using some unusual port), but all the other parts of the URL are necessary.

When a URL is used within a document, such as in an HTML page, things are a bit different. Because the browser already has the document's own URL, it can use this information to fill in the missing parts of any URL available inside that document. We can differentiate between an absolute URL and a relative URL by looking only at the path part of the URL. If the path part of the URL starts with the `/` character, the browser will fetch that resource from the top root of the server, without reference to the context given by the current document.

Let's look at some examples to make this clearer. Let's assume that the URLs are defined from within the document located at the following URL: `https://developer.mozilla.org/en-US/docs/Learn_web_development.`

`https://developer.mozilla.org/en-US/docs/Learn_web_development` itself is an absolute URL. It has all necessary parts needed to locate the resource it points to.

All of the following URLs are relative URLs:

- **Scheme-relative URL**: `//developer.mozilla.org/en-US/docs/Learn_web_development` — only the protocol is missing. The browser will use the same protocol as the one used to load the document hosting that URL.
- **Domain-relative URL**: `/en-US/docs/Learn_web_development` — the protocol and the domain name are both missing. The browser will use the same protocol and the same domain name as the one used to load the document hosting that URL.
- **Sub-resources**: `Howto/Web_mechanics/What_is_a_URL` — the protocol and domain name are missing, and the path doesn't begin with /. The browser will attempt to find the document in a subdirectory of the one containing the current resource. In this case, we really want to reach this URL: `https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL`.
- **Going back in the directory tree**: `../CSS/display` — the protocol and domain name are missing, and the path begins with ... This is inherited from the UNIX file system world — to tell the browser we want to go up by one level. Here we want to reach this URL:` https://developer.mozilla.org/en-US/docs/Learn_web_development/../Web/CSS/display`, which can be simplified to: `https://developer.mozilla.org/en-US/docs/Web/CSS/display`.
- **Anchor-only**: `#semantic_urls` - all parts are missing except the anchor. The browser will use the current document's URL and replace or add the anchor part to it. This is useful when you want to link to a specific part of the current document.

### Url username and passwords

Less common than the URL parts discussed above, you may see a username and password included in URLs.

For example:

```sh
https://username:password@www.example.com:80/
```

When included, the username and password are put between the `://` characters and the authority, with a colon between the two and an ampersand (`@`) at the end.

A username and password can be included in the URL when accessing websites that use the [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Authentication) security mechanism, to immediately sign in to a website and bypass the username/password dialog box that would otherwise appear to enter your credentials into.

While you might still see this mechanism used in the wild, it is deprecated because of security concerns, and modern websites tend to use other mechanisms for authentication. See [Access using credentials](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Authentication#access_using_credentials_in_the_url) in the URL for more details.

### Semantic_urls

Despite their very technical flavor, URLs represent a human-readable entry point for a website. They can be memorized, and anyone can enter them into a browser's address bar. People are at the core of the Web, and so it is considered best practice to build what is called semantic URLs. Semantic URLs use words with inherent meaning that can be understood by anyone, regardless of their technical know-how.

Linguistic semantics are of course irrelevant to computers. You've probably often seen URLs that look like mashups of random characters. But there are many advantages to creating human-readable URLs:

- It is easier for you to manipulate them.
- It clarifies things for users in terms of where they are, what they're doing, what they're reading or interacting with on the Web.
- Some search engines can use those semantics to improve the classification of the associated pages.

📖read more about [Data Url](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/data)