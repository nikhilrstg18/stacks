---
title: "Overview"
slug: "09_dotnet/0_c/1_object_oriented_programming/6_applied_OOP"
stack: "C#.NET"
---

```markdown markmap
- 🛣️
  - From requirements 
    - identifying classes 
    - building entity
  - Separating Responsibilities
  - Estabilishing Relationships
  - Leveraging Reuse
  - Building Reusable components
  - Plug-n-Play with Interfaces
```

## Terms in Context

👉 [Class vs Object](../../0_c/1_object_oriented_programming/0_types_vs_objects)

You may hear something like, we need to define the business objects. Confusingly, the term business object normally refers to a class.

![Terms and Context](../../../../../src/images/09_dotnet/c/oops/oop-5.png)

- In most cases, it refers to classes defined specifically for solving a business problem like our customer class here.
- So the customer class could be referred to as a business object. Used in this context, a business object is not an object at all, it is a class.
- So an object is not a class, but a business object often does refer to a class. Yeah, this seems inconsistent to me too.
- When identifying and designing classes, it doesn't really matter what we call them as long as it's clear that once we start coding, we are building classes.

![Entity](../../../../../src/images/09_dotnet/c/oops/oop-6.png)

- Let's talk about one more term at this point. Entity. We just said that a class defines the properties and actions appropriate for the thing, in that case the heart-shaped cookie.
- Calling each of the things we want to create a class for, things is a little imprecise.
- A common term is to use entity. This same term is used in the same context and database design to define the things that are significant enough to consider.
- Same here. Anything from the real world that is significant enough to be represented as a class in the application is referred to as an entity.

✏️: that this use of the term entity has nothing to do with Entity Framework, though Entity Framework also uses the term entity to define the significant things.

![Customer Management System](../../../../../src/images/09_dotnet/c/oops/oop-7.png)

- Putting the terms together, say we are building a customer management system. From the name of the system, we would expect customer would be an entity. It is important enough to consider as a class.
- After some analysis, we determine that there should indeed be a customer class. And it has first name and last name properties, and a Go On An Adventure method. When executing the application, the user may request all customers with a last name that starts with Bag.
- So the application may create two instances of the customer class; one for Bilbo Baggins and one for Frodo Baggins. These are our two objects created from the class. Bilbo and Frodo are both customer objects. They are instance s of the customer class. And either one, or both, can execute the Go On An Adventure method.

Now that we know the difference between an object and a class, let's define object- oriented programming.

## What is OOP?

> Object-oriented programming is an approach to designing and building applications that are flexible, natural, well-crafted, and testable by focusing on objects that interact cleanly with one another.

![Object Oriented Programming](../../../../../src/images/09_dotnet/c/oops/oop-8.png)

To build an application following object- oriented programming techniques, start by

1. Identifying the classes from the requirements or specification. Object-oriented programming represents the entities and concepts of an application as a set of classes.
2. Analyze the identified classes and separate responsibilities as needed. Object-oriented programming focuses on logically separating the responsibilities of the application into classes. The idea is that an application should be decomposed into parts with minimal overlap. If each class has a singular purpose, it is easier to write, test, and later find that class to update or extend it. That makes the code easier to modify and adapt to new requirements and future demands. This is sometimes called the principle of separation of concerns.
3. No class is an island. No class stands on its own. Object-oriented programming involves understanding the relationships between the classes. These relationships define how the objects created from those classes work together to perform the operations of the application.
4. One of the key goals of object-oriented programming is reuse. By extracting commonality among a set of classes into a separate class, our code is more reusable. Extensive reuse of existing proven classes shortens development time and leads to more robust applications.

Will go thorugh each of the tasks

- Though shown here as a set of steps, object-oriented programming is an iterative process.
- You may identify a few classes, look at separating out some responsibilities, and then find you need to identify more classes.
- You may define some relationships and find you need to separate out more responsibilities, and so on.

We're covering a lot. Let's look at ways to get the most.

### Pre-requisite

![Pre-requisite](../../../../../src/images/09_dotnet/c/oops/oop-9.png)

