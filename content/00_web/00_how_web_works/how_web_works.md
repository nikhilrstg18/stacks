---
title: "How does the Web works?"
slug: "00_web/00_how_web_works"
stack: "Web"
date: "2025-05-10T07:26:45.889Z"
draft: false
---

## Client and Servers

Computers connected to the internet are called **clients** and **servers**. A simplified diagram of how they interact might look like this:

![Client and Servers](../../../src/images/00_web/w-10.png)

- Clients are the typical web user's internet-connected devices (for example, your computer connected to your Wi-Fi, or your phone connected to your mobile network) and web-accessing software available on those devices (usually a web browser like Firefox or Chrome).
- Servers are computers that store webpages, sites, or apps. When a client wants to access a webpage, a copy of the webpage code is downloaded from the server onto the client machine to be rendered by the browser and displayed to the user.

## The other parts of the toolbox

The client and server we've described above don't tell the whole story. There are many other parts involved, and we'll describe them below.

For now, let's imagine that the internet is a road. On one end of the road is the client, which is like your house. On the other end of the road is the server, which is like a shop you want to buy something from.

![example](../../../src/images/00_web/w-11.jpg)

In order for data to get back and forth, we need the following things:

- **Your internet connection**: Allows you to send and receive data on the internet. It's basically like the street between your house and the shop.

- **TCP/IP: Transmission Control Protocol and Internet Protocol (TCP/IP)** are communication protocols that define how data should travel across the internet. This is like the transport mechanisms that let you place an order, go to the shop, and buy your goods. In our example, this is like a car or a bike (or however else you might travel along the road).

- **DNS**: The **Domain Name System** is like an address book for websites. When you type a web address in your browser, the browser looks at the DNS to find the website's IP address — the actual address the server is located at — before it can retrieve the website (see `DNS explained` below for more information). The browser needs to find out which server the website lives on, so it can send HTTP messages to the right place (see below). This is like looking up the address of the shop before you visit it.

- **HTTP**: **Hypertext Transfer Protocol** is an application [protocol](https://developer.mozilla.org/en-US/docs/Glossary/Protocol) that defines a language for clients and servers to speak to each other. This is like the language you use to order your goods. See `HTTP basics` below.

- **Files**: A website is made up of many different files, which are like the different goods you buy from the shop. These files come in two main types:

    - **Code**: Websites are built primarily from `HTML`, `CSS`, and `JavaScript` — the different programming languages websites are written in, which the browser interprets and assembles into a web page to display to a user.
    - **Assets**: This is a collective term for all the other items that appear on a website — such as `images`, `music`, `video`, `Word documents`, and `PDFs` — that aren't code that the browser interprets.

## So what happens, exactly?

When you type a web address (which is technically part of a URL) into your browser address bar, the following steps occur:

- The browser goes to the DNS server and finds the real address of the server that the website lives on (you look up the address of the shop).
- The browser sends an HTTP request message to the server, asking it to send a copy of the website to the client (you go to the shop and order your goods). This message, and all other data sent between the client and the server, is sent across your internet connection using TCP/IP.
- If the server approves the client's request, the server sends the client a "200 OK" message, which means "Of course you can look at that website! Here it is", and then starts sending the website's files to the browser as a series of small chunks called data packets (the shop gives you your goods, and you bring them back to your house).
- The browser assembles the small chunks into a complete web page and displays it to you (you get the goods home — new shiny stuff, awesome!).

## DNS explained

Real web addresses ([URLs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works#components_of_a_url)) aren't the nice, memorable strings you type into your address bar to find your favorite websites. They are special numbers that look like this: 192.0.2.172.

This is called an [IP address](https://developer.mozilla.org/en-US/docs/Glossary/IP_Address), and it represents a unique location on the web. However, it's not very easy to remember, is it? That's why the Domain Name System was invented. This system uses special servers that match up a web address you type into your browser (like "mozilla.org") to the website's real (IP) address.

Websites can be reached directly via their IP addresses. You can use a DNS lookup tool to find the IP address of a website.

### try out
1. Go to the NsLookup.io DNS lookup tool, type in developer.mozilla.org, and press the button.
2. In the results screen, copy the IP Address (the IPv4 address) to your system clipboard.
3. Open a new browser tab, paste the IP Address into the address bar and press Enter/Return. You should see MDN load up, proving that the IP address points to it.

## Packets explained

Earlier we used the term "packets" to describe the format in which the data is transferred between the client and server. What do we mean here?

Basically, when data is sent across the web, it is sent in thousands of small chunks. There are multiple reasons why data is sent in small packets, but most significantly:

- They are sometimes dropped or corrupted and, when this happens, it's quicker and easier to replace small chunks than entire files.
- Additionally, the packets can be routed along different paths, making the exchange faster and allowing many different users to download the same website at the same time. If each website was sent as a single big chunk, only one user could download it at a time, which would make the web very inefficient and not much fun to use.

## HTTP basics

HTTP uses a simple language of verbs to perform actions such as making requests (see [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods)). The HTTP `GET` method is the one normally used to make HTTP requests of the type described above. For example, a request for the MDN home page might look like this:

```sh
GET /en-US/ HTTP/2

Host: developer.mozilla.org
```
The response sent by the server might looks something like this:

```sh
HTTP/2 200

date: Tue, 11 Feb 2025 11:13:30 GMT
expires: Tue, 11 Feb 2025 11:40:01 GMT
server: Google frontend
last-modified: Tue, 11 Feb 2025 00:49:32 GMT
etag: "65f26b7f6463e2347f4e5a7a2adcee54"
content-length: 45227
content-type: text/html

<!doctype html> ... (the 45227 bytes of the requested web page HTML)
```

The full response is more complex than this, but we have omitted most of it for brevity. The main parts are as follows:

- **HTTP/2 200** The version of HTTP that the server is using to send the response, in this case HTTP/2, followed by a status code indicating whether the request was successful. 200 indicates success.

- **date, expires, etc**. HTTP headers containing additional information about the response (note that requests can have headers too), which provide extra information and/or modify its behavior.

- **&lt;!doctype html&gt;, etc**. The response body, which in this case contains the MDN homepage's HTML document.

### Other status codes

Above, we met the 200 status code, which indicates that the HTTP request was successful. There are many HTTP status codes with specific meanings and uses, but you will only commonly see a few:

- **301**

The requested resource has been permanently moved to a new location, which is provided in the response. This is used for redirecting content when it's moved.

- **400**

The server can't process the request. This usually happens when the request isn't in a format the server understands, or has errors in it.

- **403**

The server will not give the client access to the requested resource. This usually happens when the server knows who the client is, but they don't have permission to access the requested page.

- **404**

The server cannot find the requested resource. This status is commonly returned if the URL is wrong or if content is deleted without putting a redirect in place.

- **503**

The request cannot be handled due to a problem with the server. This is common when servers are offline for maintenance, and it's expected to be temporary.

## Components of a URL

Technically, web addresses that you type into the browser address bar form part of **Uniform Resource Locators**. URLs define the locations of unique resources on the internet.

A URL is a web address plus a protocol: for example, if you open a new tab in your browser, type in developer.mozilla.org into the address bar, and press `Enter`/`Return`, you will be redirected to a URL like the following one:

```sh
https://developer.mozilla.org/en-US/
```
The main parts of the URL are:

- **https**

The protocol being used to send the request. In this case, we are using HTTPS, which is a secure version of HTTP that stops bad people from reading your data while it is being transported. On the modern web, pretty much every server uses HTTPS, so if you don't include it explicitly, the browser assumes that is what you are using and adds it for you.

- **developer.mozilla.org**

The domain name of the URL, which represents the top-level location of the server you are connecting to. In this case, the web address you typed in is equal to the domain name, but this is not always the case — you could choose to type in a more complicated web address. Note that the developer part is a subdomain (distinct content area) of Mozilla's mozilla.org domain. There are other subdomains on Mozilla's site that host distinct content — see support.mozilla.org and bugzilla.mozilla.org, for example.

- */en-US/*

The path to the resource on the server that you are accessing. MDN keeps all its US English content in a folder called en-US, which is what this URL is pointing to.

If you have your browser set up to prefer English content by default, then this is the URL you will be redirected to when you type in `developer.mozilla.org`. If you have your browser set up to prefer a different language that MDN supports, such as French, you will be redirected to a different URL, such as `https://developer.mozilla.org/fr/` instead. This isn't available to every website by default; the MDN developers have set MDN up like this to allow people to easily access the language they prefer.

📖 read more about [web standard model](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/The_web_standards_model)

📖 read more on [how browsers load websites?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_browsers_load_websites)

