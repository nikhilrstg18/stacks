---
title: "How Web works?"
slug: "00_web"
stack: "Web"
date: "2025-05-10T07:26:45.889Z"
draft: false
---

> You will learn the basics of the technical infrastructure of the Web and the difference between Internet and the Web.

## Internet under 9min

<iframe width="100%" height="447" src="https://www.youtube.com/embed/x3c1ih2NJEg?si=9zj_Sk9zLxTQlt_y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

- The Internet is the backbone of the Web, the technical infrastructure that makes the Web possible

## Deeper dive

### A Simple Network

When two computers need to communicate, you have to link them, either physically (usually with an [Ethernet cable](https://en.wikipedia.org/wiki/Ethernet_crossover_cable)) or wirelessly (for example with [Wi-Fi](https://en.wikipedia.org/wiki/Wi-Fi) or [Bluetooth](https://en.wikipedia.org/wiki/Bluetooth) systems). All modern computers can sustain any of those connections.

![Simple Network](../../src/images/00_web/w-1.png)

Such a network is not limited to two computers. You can connect as many computers as you wish. But it gets complicated quickly. If you're trying to connect, say, ten computers, you need 45 cables, with nine plugs per computer!

![Complex Simple Network](../../src/images/00_web/w-2.png)

To solve this problem, each computer on a network is connected to a special tiny computer called a network switch (or switch for short). This switch has only one job: like a signaler at a railway station, it makes sure that messages sent from a given computer arrive only at their target destination computer. To send a message to computer B, computer A sends the message to the switch, which in turn forwards the message to computer B — computer B doesn't get messages intended for other computers, and none of the messages for computer B reach other computers on the local area network.

Once we add a switch to the system, our network of 10 computers only requires 10 cables: a single plug for each computer and a switch with 10 plugs.

![Network with swtich](../../src/images/00_web/w-3.png)

### A Network of Networks

So far so good. But what about connecting hundreds, thousands, billions of computers? Of course a single switch can't scale that far, but, if you read carefully, we said that a switch is a computer like any other, so what keeps us from connecting two switches together? Nothing, so let's do that.

![Network of Networks](../../src/images/00_web/w-4.png)

You may imagine that we can connect switches together infinitely, to form a network like this:

![Network of Networks - infinitely](../../src/images/00_web/w-5.png)

In reality, this leads to many engineering problems. The more switches a packet has to go through, the longer it takes to reach its destination. And you can't have just a tree of switches, because then a single switch failure may disconnect a large portion of devices. To solve this problem, we keep each local network as small as possible, and we connect these local networks using a separate device called a router. A router is a computer that knows how to forward messages between networks. The router is like a post office: when a packet arrives, it reads the recipient address and forwards the packet to the right recipient directly, without going through layers of relays.

Such a network comes very close to what we call the Internet. We just need the physical medium (cables) to connect all these routers. Luckily, such an infrastructure already existed prior to the Internet, and that's the telephone network. To connect our network to the telephone infrastructure, we need a special piece of equipment called a modem. This modem turns the information from our network into information manageable by the telephone infrastructure and vice versa.

![Network with Routers](../../src/images/00_web/w-6.png)

✏️ _that the commercial router in your home is likely a combination of a switch, a router, and a modem, all in one device._

So we are connected to the telephone infrastructure. The next step is to send the messages from our network to the network we want to reach. To do that, we will connect our network to an Internet Service Provider (ISP). An ISP is a company that manages some special routers that are all linked together and can also access other ISPs' routers. So the message from our network is carried through the network of ISP networks to the destination network. The Internet consists of this whole infrastructure of networks.

![Network with Internet Service Provider](../../src/images/00_web/w-7.png)

### Finding Computers

If you want to send a message to a computer, you have to specify which one. Thus any computer linked to a network has a unique address that identifies it, called an "IP address" (where IP stands for Internet Protocol). It's an address made of a series of four numbers separated by dots, for example: `192.0.2.172`.

That's perfectly fine for computers, but we human beings have a hard time remembering that sort of address. To make things easier, we can alias an IP address with a human-readable name called a domain name. For example (at the time of writing; IP addresses can change) google.com is the domain name used on top of the IP address `142.250.190.78`. So using the domain name is the easiest way for us to reach a computer over the Internet.

![Finding Computers on Internet](../../src/images/00_web/w-8.png)

### Internet and the Web

As you might notice, when we browse the Web with a Web browser, we usually use the domain name to reach a website. Does that mean the Internet and the Web are the same thing? It's not that simple. As we saw, the Internet is a technical infrastructure which allows billions of computers to be connected all together. Among those computers, some computers (called Web servers) can send messages intelligible to web browsers. The Internet is an infrastructure, whereas the Web is a service built on top of the infrastructure. It is worth noting there are several other services built on top of the Internet, such as email and [IRC](https://developer.mozilla.org/en-US/docs/Glossary/IRC).

#### Intranets and Extranets

- Intranets are private networks that are restricted to members of a particular organization. They are commonly used to provide a portal for members to securely access shared resources, collaborate and communicate. For example, an organization's intranet might host web pages for sharing department or team information, shared drives for managing key documents and files, portals for performing business administration tasks, and collaboration tools like wikis, discussion boards, and messaging systems.

- Extranets are very similar to Intranets, except they open all or part of a private network to allow sharing and collaboration with other organizations. They are typically used to safely and securely share information with clients and stakeholders who work closely with a business. Often their functions are similar to those provided by an intranet: information and file sharing, collaboration tools, discussion boards, etc.

Both intranets and extranets run on the same kind of infrastructure as the Internet, and use the same protocols. They can therefore be accessed by authorized members from different physical locations.

![Internet Vs Extranet Vs Intranet](../../src/images/00_web/w-9.png)

