---
title: "Plug n Play with Interfaces - Abstraction"
slug: "09_dotnet/0_c/1_object_oriented_programming/6_applied_OOP/6_plug-n-play_with_interfaces"
stack: "C#.NET"
---

Interfaces provide a clean way to work with a set of classes in a common manner

> In computing, an **interface** is a shared boundary across which two or more separate components of a computer system exchange information.
> The exchange can be between S/W, computer H/W, peripheral devices, humans and combinations of these

![Need of interaface](./../../../../../../src/images/09_dotnet/c/oops/goop-1.png)

- Hence, the boundary between the user in an application is called the **User Interface aka UI**.
- In web development, the boundary between a back end that provides services and the front-end clients requesting those services is called a web **Application Programming Interface aka API**.
- And in an object-oriented application, the boundary between each class and the rest of the application is called a **class interface**.

❓**But what exactly is a class interface**

![outline](./../../../../../../src/images/09_dotnet/c/oops/goop-2.png)

Here,

- We begin by examining what a class interface is.
- Wwe define our own interface and implement that interface in our entity classes.
- We cover how to leverage interface- based polymorphism to build more generalized and reusable code.

Let's get started.

## Class interface

![Class Interface](./../../../../../../src/images/09_dotnet/c/oops/goop-3.png)

- Every class has a basic class interface comprised of its `public` members. Each of the `public` properties and methods are part of that interface.
- By declaring a property or method as `public` in the class, that member automatically becomes part of that class interface. There is no special code, keyword, or configuration required.
- Other parts of the application communicate with this class through this interface. Access the `public` property to work with data from the class. Call a `public` method to execute code in the class.
- So a class interface is basically **what a class looks like to the rest of the application**.
- Each class we've created so far in this course has a class interface defined by its `public` properties and methods. And we've been using that interface to work with our classes.

![Diagrammatically, Class Interface](./../../../../../../src/images/09_dotnet/c/oops/goop-4.png)

- Interfaces are sometimes shown with a connector that looks like a lollipop attached to the class. The idea is that other classes connect to this class via this connector.
- In this example, the interface for our `Customer` class includes the `LastName`, `FirstName`, other defined `public` properties, and a `Validate` method. And the interface for our `Product` class includes the `ProductName`, `CurrentPrice`, other defined public properties, along with a `Validate` method.

![Interface](./../../../../../../src/images/09_dotnet/c/oops/goop-5.png)

In C#, we can define additional interfaces for our classes. We define an interface using the `interface` keyword

✏️: By convention, the interface name begins with an **I**.

Like a class, the interface defines a set of related properties and methods, but unlike a class, an interface does not provide any code for those properties and methods, only the signature.

![Class Interface](./../../../../../../src/images/09_dotnet/c/oops/goop-6.png)

- Any class that implements the `interface` provides the code for each property and method specified in the interface.
- Say we want to add a general purpose logging service to our application. We define an `ILoggable` interface with a `Log` method.
- If we want to log both customer and product information, we implement the `ILoggable` interface in both classes.
- Each class then provides the code for every property and method in the interface.
- In this example, there is only one method, so each class implements that Log method. The application can work with a class through any of its interfaces.

For eg,

- The application can work with the `Customer` class through its basic class interface, shown in blue, to access the `LastName` or `FirstName` properties or call the `Validate` method.
- Or the application can work with a `Customer` class through the `ILoggable` interface, shown in purple. The application code can use this interface and call the Log method on the `Customer`. Same with the `Product` class. Code can access the class through its basic class interface or through the `ILoggable` interface.

## Interface metophors

There are several metaphors to aid in understanding interfaces.

> interface as defining a role that an object can play.

![Interface define "Roles"](./../../../../../../src/images/09_dotnet/c/oops/goop-7.png)

Consider a person.

- A person has a default set of properties and behaviors that comprise their **default person interface**.
- Depending on the person, they may also have the `IParent` role and have parental properties and behaviors.
- They may have the `IPartner` role
- The `IEmployee` role.

Anyone can interact with this person through one of their roles.

In our scenario, the `Customer` class has its default class role and its `ILoggable` role to log out customer information. Or to say it another way, an object performs the logging role through its `ILoggable` interface. Another common metaphor for understanding

> interfaces is a contract.

![Interface is a Contract](./../../../../../../src/images/09_dotnet/c/oops/goop-8.png)

Think of an interface as a contract that **specifies the set of properties and methods that must be available on any implementing object**.
In this example,

- Our `ILoggable` contract has only one method, `Log`.
- If the `Customer` class implements the `ILoggable` interface, it is contractually obligated to implement the `Log` method.
- Any other part of the application can depend on that contract.

✏️: That means we can write generalized code that works with potentially unrelated classes through a common interface and be guaranteed that the interface methods are implemented.

Now let's walk through a scenario to better understand how to leverage reuse through interfaces.

## Setting up a Demo

A common requirement in many applications is to log important information.

![Logging](./../../../../../../src/images/09_dotnet/c/oops/goop-9.png)

- We can log information helpful for **resolving bugs**. If a bug occurs, the support team can look at the log to determine the current application's state and what the system was doing when the bug occurred.
- We can log information for **security** purposes. System administrators can identify who did what when.
- We can log information for **data analysis**, which features of the system are used most often.

There are many different ways we can build logging into our application, including buying third-party products. For our example, we'll create our own logging mechanism.

![Reusable Component Library](./../../../../../../src/images/09_dotnet/c/oops/goop-10.png)

We've already created a reusable library component we called `Acme.Common`.

- We'll create a general purpose logging service in that component. The service will write the logging information to a log file, but how will this service know what information to log?
- The required information is different for each class. We need each class to be responsible for defining what it wants logged to the log file.

To accomplish our objective, let's add a `Log` method to both our `Customer` and `Product` classes, leveraging string interpolation expression.

```csharp
//Product.cs
namespace ACM.BL{
    public class Product{
        //..

        public string Log() => $"{ProductId}:{ProductName} Detail: {ProductDescription} Status:{EntityState.ToString()}"

        //..
    }
}
```

Next, let's create a logging service class in the Acme.Common component. Right-click on the Acme.Common project, and select Add, Class. Name that class LoggingService.

![Problem in creating Logging Service](./../../../../../../src/images/09_dotnet/c/oops/goop-11.png)

We want the class to be public so it can be accessed from anywhere in the application and static so we don't have to instantiate it.

- In that class, let's create a public method for the logging, and call it `WriteToFile`. Because it is a utility method, we'll make it `static`. And since it doesn't return anything, we'll set the return type to void.

- We pass in a list of all of the objects to log. ❓**Hmmm, what kind of list is this** Well, we could define just a list of type Object, then we can put anything in the list. Now we want to loop through each item and call its Log method.

- We can then write the results into our file. For our purposes, we'll just write to the console for now. But when I type item., only the members from the Object class appear.

Attempting to call the Log method doesn't work. **Now what❓ Any ideas❓**

Well, we finally come back to the purpose of this module. Let's define an `interface`. We could then implement that interface in each class and access each instance here using that common interface. Let's comment this line out for now and define an interface.

## Defining interface

![Defining interface](./../../../../../../src/images/09_dotnet/c/oops/goop-12.png)

- An `interface` **specifies only the definition or signature of the properties and methods**, i.e., it defines the name and data type for each property and the name and return value for each method along with the type and order of the method parameters.
- The interface does not include any implementation. There is no **code in an interface, only signatures**.
- The implementation is provided by the class that implements the interface.

![Defining interface rules](./../../../../../../src/images/09_dotnet/c/oops/goop-13.png)

- To define an interface, add a new interface item to the project. By convention, we prefix the interface name with an I. Be sure to specify the public access modifier so any class can use the interface.
- Then define the members of the interface by adding the property, method, event, or indexer signatures.
  ✏️: an interface cannot define constants, fields, operators, or constructors.
- There is no need for an access modifier on the members. All members of an interface are public.
- An interface does not provide an implementation, so there is no code in the interface, only the property and method signatures.

Let's build an interface to support the logging feature. An interface is normally created in its own file, similar to a class. We'll define the interface as part of the Acme.Common project, so it can be used by any component or application. Right-click on the Acme.Common project, and select Add, New Item. Pick the interface template. Following common conventions, interfaces begin with the letter I, and the Interface name reflects its purpose. In this case, we'll call it ILoggable. Any class that implements this interface becomes loggable.

```csharp
//ILoggable.cs
namespace Acme.Common
{
    public interface ILoggable
    {
        string Log();
    }
}
```

- Be sure to make the interface `public`.
- We only want one method, `Log`. The Log method returns a string containing the information to log.
- We could add any number of other members, but that's all we need.

✏️: we don't add any curly braces or any code to the Log method and terminate its signature with a semicolon.

- Once an interface is defined, it can be implemented in any class that wants to take on the loggable role or support the loggable contract.
- The implementation is specified in the class that implements the interface. Let's see how that works.

## Implementing interface

![Implementing an interface in a class requires two steps](./../../../../../../src/images/09_dotnet/c/oops/goop-14.png)

- First, add the interface to the class signature.

  - Insert a colon and the name of the interface.
  - The class is now set to implement the interface.
  - Separate multiple interfaces with commas.

- Then implement every member of the interface.
  - That involves writing code for every property, method, event, or indexer specified in that interface.
  - The member must be public, non-static, and have the same name and signature as the interface member.

![Implementing an interface](./../../../../../../src/images/09_dotnet/c/oops/goop-15.png)

- By default, a class always has its basic class interface.

- A class can implement any number of additional interfaces.

Implementing an interface essentially adds the lollipop to the class. For example, if the `Customer` class implements the `ILoggable` interface, it gets another lollipop.

![Implementing Customer with ILoggable capability](./../../../../../../src/images/09_dotnet/c/oops/goop-16.png)

If `Customer` class implemented an `IEmailable` interface, that would be another lollipop.

![Implementing Customer with IEmailable capability](./../../../../../../src/images/09_dotnet/c/oops/goop-17.png)

Any code in the application can work with this class through its default role using any of the class interface members. Or work with this class through its `ILoggable` role, calling the `Log` method. Or work through its `IEmailable` role, calling the `Send` method.

Let's implement our `ILoggable` interface in our entity classes.

```csharp
//Product.cs
namespace ACM.BL{
    public class Product :EntityBase, ILoggable
    {
        //..

        //..
    }
}
```

Let's start with the `Customer` class.

- Implement the `ILoggable` interface by adding the interface to the class signature after the colon.
- Recall that `EntityBase` is the base class that the `Customer` class inherits from. Add a comma and the name of the interface.
- Note that all interfaces must be listed after any base class.
- Use the quick action to add the needed using statement.
- The `ILoggable` interface requires a Log method. We already have that method here. So that's it.

✏️: that the interface has an error; Order does not implement interface member ILoggable.Log.

❓**What if we didn't already have a Log method**

```csharp
//Product.cs
namespace ACM.BL : EntityBase, ILoggable
{
    public class Product
    {
        //..
        public string Log() => $"{ProductId}:{ProductName} Detail: {ProductDescription} Status:{EntityState.ToString()}"
        //..
    }
}
```

Now that we have multiple classes (`Customer`, `Order`, `OrderItem`, `Address`, etc.) that use the `ILoggable` interface, we can fix up the logging service we started earlier by leveraging **polymorphism**.

## Interface-based Polymorphism

![Interface-based Polymorphism](./../../../../../../src/images/09_dotnet/c/oops/goop-18.png)

In OOP, that means that a method can have the same signature, but different implementations in different classes. Earlier in this course, we leveraged inheritance-based polymorphism. We defined a `Validate` method in the `EntityBase` class and overrode it in our derived entity classes. Any code that calls the Validate method executes the correct shape of that method based on the type of object that called it.

![Interface-based Polymorphism](./../../../../../../src/images/09_dotnet/c/oops/goop-19.png)

We can also leverage polymorphism through interfaces. At this point, our Log method is polymorphic. It has many shapes. One shape in the Customer class logs customer information. Another shape in the Product class logs product information, and so on. We could have dozens of shapes of the Log method. Any code that calls the Log method executes the correct shape of that method based on the type of object that called it.

Let's see how we can take advantage of interface-based polymorphism. Here is the `LoggingService` class

![Interface-based Polymorphism in LoggingService](./../../../../../../src/images/09_dotnet/c/oops/goop-20.png)

- Our generalized logging code does not need to know anything about any of our entity or other classes. It just requires any class that wants to participate in logging implement the `ILoggable` interface.
- Then the `LoggingService` provides that logging, calling the class unique shape of the Log method to obtain the data to log. Think about how useful this would be in any common code

We will update our unit tests to verify expectation on above changes

![LoggingServiceTests](./../../../../../../src/images/09_dotnet/c/oops/goop-21.png)

![LoggingServiceTests Execution result](./../../../../../../src/images/09_dotnet/c/oops/goop-22.png)

- Looking again at our `LoggingService` `WriteToFile` method, we were able to call each item's Log method by leveraging interface-based polymorphism.
- Each class that implemented the `ILoggable` interface was contractually obligated to have a Log method.
- This loop knows which log method to call based on the underlying type of object. When it iterates through to a customer object, it calls the Log method in the Customer class through its `ILoggable` interface.
- If it's a product object, it calls the Log method in the `Product` class through its `ILoggable` interface, and so on.

Now that we've seen polymorphism in action, let's identify the key benefits of interfaces in polymorphism.

![Interface-based Polymorphism](./../../../../../../src/images/09_dotnet/c/oops/goop-23.png)

![Benfits of Interface and Polymorphism](./../../../../../../src/images/09_dotnet/c/oops/goop-24.png)

- An interface provides strong typing when working with objects through that interface. We then get the benefit of IntelliSense and better syntax checking.
- An interface defines commonality among otherwise unrelated classes. The application can use that interface to work with the set of classes that implement the interface.
- Interface-based polymorphism aids in building generalized utility methods that can leverage class unique functionality. For example, our general purpose logging service logs unique data from unrelated classes by calling one of the many shapes of the Log method.

This is why interfaces are used throughout .NET and in many design patterns.

## Summary

![Interfaces](./../../../../../../src/images/09_dotnet/c/oops/goop-25.png)

- We discussed several metaphors for understanding interfaces.
- Interfaces define a role that an object can play in the operation of the application.
- Interfaces define a contract specifying the set of properties and methods that must be provided by any implementing object.
- Basically, an interface is comprised of a list of properties, methods, events, and iterators denoting the data and operations that an object can perform.

![Class Interface](./../../../../../../src/images/09_dotnet/c/oops/goop-26.png)

- Every class has a basic interface defined by the public properties and methods of the class.
- The application uses this interface to work with the class in its primary role, accessing its public properties, and calling its public methods.

![Interfaces](./../../../../../../src/images/09_dotnet/c/oops/goop-27.png)

- We can define any number of additional interfaces.
- Define an interface using the interface keyword.
- Specify the signatures of the interface members with no code.

![Implementing an Interface](./../../../../../../src/images/09_dotnet/c/oops/goop-28.png)

- Any class can implement an interface.
- Implement an interface by adding it to the class signature after a colon.
- Define multiple interfaces separated by commas.
- The class must then write code for every property and method defined in that interface.

![Interface-based Polymorphism](./../../../../../../src/images/09_dotnet/c/oops/goop-29.png)

- Polymorphism means many shapes.
- In the context of interfaces, we specify a method name and an interface, and write code for that method in each class that implements the interface, giving that method its many shapes.
- This allows us to work with otherwise unrelated classes in a generalized, reusable way. Only one short module left.

![Object-Oriented Programming](./../../../../../../src/images/09_dotnet/c/oops/goop-30.png)

![Next Step](./../../../../../../src/images/09_dotnet/c/oops/goop-31.png)
