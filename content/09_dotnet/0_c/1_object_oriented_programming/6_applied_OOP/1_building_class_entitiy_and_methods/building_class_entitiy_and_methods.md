---
title: "Building Class Entity & Methods"
slug: "09_dotnet/0_c/1_object_oriented_programming/6_applied_OOP/1_building_class_entitiy_and_methods"
stack: "C#.NET"
---

Now that we've defined a set of classes for our basic entities, let's build them. This module demonstrates how to build classes.

![Identified classes](./../../../../../../src/images/09_dotnet/c/oops/boop-1.png)

Recall the classes we identified so far in this course; `Customer`, `Product`, `Order`, and `OrderItem`. This module provides step- by-step demonstrations showing you how to create and test one of these entity classes. The others are created later in this course using the same techniques. But before we can build the classes, we need to lay out the structure of the application

## Layering the App

Most applications today are built with a layered structure.

![Layering the App](./../../../../../../src/images/09_dotnet/c/oops/boop-2.png)

Though not specifically an object-oriented programming concept, _layering is key to defining a good application structure_. That structure is then defined in Visual Studio using a solution for the application and a project for each layer.

![Common App Layer](./../../../../../../src/images/09_dotnet/c/oops/boop-3.png)

Most applications are minimally divided into three layers.

1. The **user interface** aka `UI` layer is where we create the forms, or pages, that are displayed to the user. It includes any logic required to control and populate the user interface elements.
2. The **business logic** layer is where most of the `application logic` resides, including the logic to perform the business operations. The design we have so far in this course will be implemented in the business logic layer.
3. **Data access** layer that contains the code to `retrieve data from the data store` or other database and `save data back to that data store`. If you use Entity Framework, this is where the Entity Framework code resides.

✏️: Some applications have additional layers, depending on the complexity and design of the application. Though it's not really a layer, many applications include a common library for general purpose code that's useful throughout the application. That can include code for features such as logging or sending an email.

![Visual Studio Solution](./../../../../../../src/images/09_dotnet/c/oops/boop-4.png)

- Each of the layers and the common library are defined as a separate project within a Visual Studio solution. When the code in each project is built, Visual Studio creates an appropriate component. The user interface project might compile to an exe. The remaining layers are created as class libraries and compiled to DLLs.
- Dividing an application into layers makes it easier to work with each layer and easier to extend the application.
- By having the business logic separate from the user interface, we could later add a web user interface onto a desktop application without reworking or rewriting any of the business logic. Now we are ready to start building our application.

## Building Business Layer component

The classes we have identified so far will contain the data and processing required for the business logic. So let's start by building our business logic component. I've just opened Visual Studio. Start by creating a new project.

![New Project in VS](./../../../../../../src/images/09_dotnet/c/oops/boop-5.png)

Click Create new project on the start page or File>New>Project from the menu. Then, select the project template.

- First, pick the desired language (C#) on the left.
- On the right, select the template. Since we are building the project for the business logic, we want the template for our `Class Library`. We'll stick to the .NET Framework Class Library for our purposes.
- We are building the Acme Customer Management System business layer, so we'll name the project `ACM`, for Acme Customer Management, `.BL` for business layer. I'll pick my desired location. And since the solution will hold all of the projects for this application, we'll name it just `ACM`. Visual Studio then creates the solution and project and displays it in Solution Explorer. It also creates a default class for us. Looks like we are ready to write some code.

## Building a class

#### Properties

In this demo, we build the customer class and add some of its properties. Now that we created the business layer project, we can add the entity classes to that project.

```csharp
// Customer.cs
namespace ACM.BL
{
    public class Customer
    {

    }
}
```

- Will start by creating new file (customer.cs)> Creating a `class` (**Customer**) with `public` access modifer because class by default are private and not accessible to other code (i.e. Customer class in BL layer is callable from other layer of the app like DL layer)
- Just like `string` and `integer` are types, our `Customer` class is a type on which we can define class members.
- First will define a field called \_firstName by leveraging Encapsulation as below

```csharp{6}
// Customer.cs
namespace ACM.BL
{
    public class Customer
    {
        private string _lastName;
    }
}
```

In code, the data is hidden by defining a private backing field. This field holds the data, and it uses a private access modifier to ensure that no code outside of this class can access it. The data is accessible to other parts of the application through a C# property as below

```csharp{6,7-17}
// Customer.cs
namespace ACM.BL
{
    public class Customer
    {
        private string _lastName;
        public string LastName
        {
            get
            {
                return _lastName;
            }
            set
            {
                _lastName = value;
            }
        }
    }
}
```

> A property is often defined with a `public` access modifier, meaning any code can use it to get or set the data.

- If we want the property to only be accessed within the current project, meaning our business logic layer, we can use the `internal` access modifier instead.
- Internal means that access is limited to code internal to the project in which it is defined. Code in any other project such as the user interface layer could not access the property. In this case, we do want this property to be `public`.
- A property includes a get accessor aka `getter`, and a set accessor aka `setter`.
- As its name implies, the get accessor gets the property value. In this example, the code returns the value of the backing field. We can add code in the get accessor to perform any operations prior to returning the value such as verifying that the user can access this data or reformatting or converting the data. For example, if this was returning a price, it could return it in the appropriate currency for the user's country.

`❓ To Make a Readonly Property`

```csharp{6,7-13}
// Customer.cs
namespace ACM.BL
{
    public class Customer
    {
        private string _lastName;
        public string LastName
        {
            get
            {
                return _lastName;
            }
        }
    }
}
```

`❓ To Make a Writeonly Property`

```csharp{6,7-13}
// Customer.cs
namespace ACM.BL
{
    public class Customer
    {
        private string _lastName;
        public string LastName
        {
            set
            {
                _lastName = value;
            }
        }
    }
}
```

✏️: In C#, you can use `auto implemented property` by using shorter property expression as below

```csharp{6,7-18}
// Customer.cs
namespace ACM.BL
{
    public class Customer
    {
        public string FirstName {get; set;}

        private string _lastName;
        public string LastName
        {
            get
            {
                return _lastName;
            }
            set
            {
                _lastName = value;
            }
        }
    }
}
```

✏️: How much shorter that syntax is when we define another Property `FirstName`, but `where's the backing field❓`

Behind the scenes, the code is still creating a backing field, we just don't have to manage it. _We get the benefits of encapsulation without the extra code_.

`❓ When to use shorter property expression`
If there is no need for logic within the getter or setter, use an auto implemented property, otherwise, use the full property syntax. But there are other ways to create properties.

```csharp{6,7-15}
// Customer.cs
namespace ACM.BL
{
    public class Customer
    {
        public int CustomerId {get; set;}
        public string EmailAddress {get; set;}
        public string FirstName {get; set;}
        public string LastName {get; set;}
        public string FullName {
            get
            {
                return FirstName + " " + LastName;
            }
        }
    }
}
```

Now that we have our first set of logic in our application for `Customer` class, let's write our first unit test.

#### Constructors

> A class constructor is basically a special kind of method named with a class name that is executed each time an instance of the class is created.

```csharp{17-20}
// Customer.cs
namespace ACM.BL
{
    public class Customer
    {
        public int CustomerId {get; private set;}
        public string EmailAddress {get; set;}
        public string FirstName {get; set;}
        public string LastName {get; set;}
        public string FullName {
            get
            {
                return FirstName + " " + LastName;
            }
        }

        public Customer()
        {

        }
    }
}
```

- Constructors are normally defined at the top of the class, above the properties.
- Use a snippet to create the constructor, `ctor`, short for constructor, Tab, Tab.
- The code inside the constructor is used to initialize the object.
- A constructor with no parameters is referred to as the default constructor.

✏️: In many cases in C#, the properties of the object default to valid values, so there is no need to initialize them in this constructor. If there is no need for code in the constructor, don't create one. _An implicit default constructor is defined automatically_.

- Because this method is executed when an object of the class is created, it is important that the body of the constructor create the object in a usable state. That is to say there should be no code in the constructor that could generate an error.

Add additional constructors with parameters as required. for eg. intializing the property with private setter like `CustomerId`

```csharp{6, 17-24}
// Customer.cs
namespace ACM.BL
{
    public class Customer
    {
        public int CustomerId {get; private set;}
        public string EmailAddress {get; set;}
        public string FirstName {get; set;}
        public string LastName {get; set;}
        public string FullName {
            get
            {
                return FirstName + " " + LastName;
            }
        }

        public Customer()
        {
        }

        public Customer(int customerId)
        {
            CustomerId = customerId;
        }
    }
}
```

✏️: An implicit default constructor is not automatically created when there are overloaded constructors defined. Now the first cut of our customer class is done.

#### Methods

We examine how to create methods as we create the methods for the `Customer` class. We are back in Visual Studio looking at the `Customer` class. previously, we created these properties. Let's add the methods after the properties in the code file to keep our class organized.

```csharp{6, 17-24}
// Customer.cs
using System.Collection.Generics;

namespace ACM.BL
{
    public class Customer
    {
        public int CustomerId {get; private set;}
        public string EmailAddress {get; set;}
        public string FirstName {get; set;}
        public string LastName {get; set;}
        public string FullName {
            get
            {
                return FirstName + " " + LastName;
            }
        }

        public Customer()
        {
        }

        public Customer(int customerId)
        {
            CustomerId = customerId;
        }

        ///<summary>
        /// validates the customer data
        ///</summary>
        ///<returns><returns>
        public bool Validate()
        {
            return !string.IsNullOrWhiteSpace(FullName);
        }

        ///<summary>
        /// retrives all customer data
        ///</summary>
        ///<returns><returns>
        public List<Customer> Retrieve()
        {
            // code that retrieve all customers from data store
            return new List<Customer>();
        }

        ///<summary>
        /// retrives customer data by id
        ///</summary>
        ///<returns><returns>
        public Customer Retrieve(int customerId)
        {
            // code that retrieve customer from data store
            return new Customer();
        }

        ///<summary>
        /// persist customer data
        ///</summary>
        ///<returns><returns>
        public bool Save(int customerId)
        {
            // code that persist customer to data store
            return true;
        }
    }
}
```

- The function access modifier is `public`, so any other code in the application can call it such as a user interface.
- The method returns a `true` or `false` value defining whether the data is valid. So the return type of the function is a `bool`.
- The body of the Validate method validates the property values. Let's say that this specification identified that the full name should not be empty, so our object data is not valid unless this property have a value. Our Validate method code checks that the the property is not null, empty, or just whitespace. The result is a Validate method that validates the state of the customer object as part of the specification.

- We have two more methods defined for the `Customer` class; `Retrieve` and `Save`. Here is some step code for a save and for a retrieve.
- This retrieve returns one specific customer by `ID`, but what if we need to display a list of customers?
- If we have a small number of customers, we may also want the retrieve method that retrieves all of them, or if we have many customers, we may want a retrieve method that retrieves all of them for a specific region or all of them with orders that are pending. For our purposes, we'll just define a second retrieve with no parameter that returns all of the customers.
- This retrieve returns a list of customers as a generic collection. If you are not familiar with the generic list collection, check out the C# Best Practices: Collections and Generics course in the Pluralsight library. We're not going to concern ourselves with the remainder of the code for the Retrieve and Save methods at this time, but we do have completed code in our Validate method.

`❓How do we try it out` Another unit test(s) to cover each method.

✏️: System uses **method signture** to match up the calls to the function

1. Comprised of its name and type of each if its formal parameters.
2. Doesn't include return type

```csharp{41-55}
// Customer.cs
using System.Collection.Generics;

namespace ACM.BL
{
    public class Customer
    {
        private string _lastName;
        public int CustomerId {get; private set;}
        public string EmailAddress {get; set;}
        public string FirstName {get; set;}
        public string LastName {
            get => _lastName;
            set =>_lastName = value
        }
        public string FullName {
            get
            {
                return FirstName + " " + LastName;
            }
        }

        public Customer()
        {
        }

        public Customer(int customerId)
        {
            CustomerId = customerId;
        }

        ///<summary>
        /// validates the customer data
        ///</summary>
        ///<returns><returns>
        public bool Validate()
        {
            return !string.IsNullOrWhiteSpace(FullName);
        }

        ///<summary>
        /// retrives all customer data
        ///</summary>
        ///<returns><returns>
        public List<Customer> Retrieve() // -> Retrieve()
        {
            // code that retrieve all customers from data store
            return new List<Customer>();
        }

        ///<summary>
        /// retrives customer data by id
        ///</summary>
        ///<returns><returns>
        public Customer Retrieve(int customerId) // -> Retrieve(int)
        {
            // code that retrieve customer from data store
            return new Customer();
        }

        ///<summary>
        /// persist customer data
        ///</summary>
        ///<returns><returns>
        public bool Save(int customerId)
        {
            // code that persist customer to data store
            return true;
        }

    }
}
```

In Customer class, Retrieve is overloaded method, read more about [method overloading](../../../0_c/1_object_oriented_programming/3_polymorphsim#method-overloading)

**Contract**

```csharp{9-12, 16, 23, 27, 36, 45, 55, 65}
// Customer.cs
using System.Collection.Generics;

namespace ACM.BL
{
    public class Customer
    {
        private string _lastName;
        public int CustomerId {get; private set;}
        public string EmailAddress {get; set;}
        public string FirstName {get; set;}
        public string LastName {
            get => _lastName;
            set =>_lastName = value
        }
        public string FullName {
            get
            {
                return FirstName + " " + LastName;
            }
        }

        public Customer()
        {
        }

        public Customer(int customerId)
        {
            CustomerId = customerId;
        }

        ///<summary>
        /// validates the customer data
        ///</summary>
        ///<returns><returns>
        public bool Validate()
        {
            return !string.IsNullOrWhiteSpace(FullName);
        }

        ///<summary>
        /// retrives all customer data
        ///</summary>
        ///<returns><returns>
        public List<Customer> Retrieve()
        {
            // code that retrieve all customers from data store
            return new List<Customer>();
        }

        ///<summary>
        /// retrives customer data by id
        ///</summary>
        ///<returns><returns>
        public Customer Retrieve(int customerId)
        {
            // code that retrieve customer from data store
            return new Customer();
        }

        ///<summary>
        /// persist customer data
        ///</summary>
        ///<returns><returns>
        public bool Save(int customerId)
        {
            // code that persist customer to data store
            return true;
        }

    }
}
```

In VS, to see outline press `Ctrl` + `M` + `O` on keyboard

- The _properties_ and _methods_ declared with a `public` access modifier comprise the **class contract**.
- That is to say, the class makes a promise that it will provide the defined _properties_ and _methods_ to any other code in the application that needs them.
- Over time, the code can extend the contract by adding new _properties_ and _methods_, but it should not remove _properties_ and _methods_ or modify a method signature once the class has been deployed to production.
- This contract is also called the `class interface`.

## Working with objects

- Working with objects can seem a bit strange at first. Let's review how to create a new object.
- An object is created using the `new` keyword, followed by the type of object to create, and parenthesis. This example creates a new instance from the Customer class. Assign the resulting object to an object variable. The type of the object variable is the type of the created object. The object variable then holds a reference to that newly created instance. When defining local object variables, instead of declaring a specific type, use the `var` keyword.
  `var` defines an implicitly-typed variable. An implicitly-typed variable is strongly typed just as if it were declared with a specific type. _Using var shortens the syntax and can make the code easier to read in cases where the type is obvious_.
- Here we are obviously creating an object of type customer. Once we have an object variable, we use it to access the class properties.

![Accessing Properties](./../../../../../../src/images/09_dotnet/c/oops/boop-6.png)

Here is the `Customer` class similar to how we have it so far. We use the full property syntax for the `LastName` property and auto implemented properties for the `CustomerId`, `EmailAddress`, and `FirstName`. For the `FullName`, we defined a read-only property by defining a getter with no setter. Assign a value to a property with an equal sign just like assigning a value to a variable. Assigning a value to the property executes the setter. This example assigns the value of the backing field to Baggins. Use the same syntax to set the `FirstName`. Even though this property uses the auto implemented property syntax, assigning to the property still executes the setter and sets the value of the hidden backing field to Bilbo. Get the value of the property by simply referencing it, and it executes the getter. This example returns the `FullName` of Baggins, Bilbo. But working with objects can get a bit more complex.

#### Reference Types

Objects are reference types, meaning that _they hold a reference to their data, not the data itself_.
This is different than value types such as integers that _hold their data directly_.
`Why does this matter❓`
Well, here's a little quiz.
![Objects are Reference Types](./../../../../../../src/images/09_dotnet/c/oops/boop-7.png)

- In this first case, we declare an integer `i1`, and set it to 42. Then, define a second integer `i2`, and set it equal to `i1`. Now for the tricky part, set `i2` equal to 2. What it `i1` at this point❓

To find the answer, let's talk through that again. We declare `i1` and set it to 42. Then we declare `i2` and set it equal to `i1`, which copies the value of 42. Then we change `i2` to be 2, so what is `i1` at this point? It's still 42.

- Now let's look at what happens when we do something similar with reference types. Declare a new customer, `c1`, set `c1`'s FirstName to Bilbo, then declare a second customer, `c2`, and set it equal to `c1`. Then change `c2`'s FirstName to Frodo. What is `c1`.FirstName? Let's talk through that again. First, we declare `c1`. It's referencing a new customer. We set the FirstName for that customer to Bilbo. Then we create a second object variable, `c2`, and reference that same customer. At this point, since they are reference types, both `c1` and `c2` are referencing the same customer. So if we change `c2`'s FirstName to Frodo, what is `c1`.FirstName? It is also Frodo because they are both pointing to the same customer.

It is important to remember how reference types work as you create and manipulate objects.
`But what if you need a property that is shared with all instances of a class❓` That's the purpose of the static modifier.

## static modifier

> The `static` modifier **declares a member that belongs to the class itself instead of to an object of the class**.

- This is useful for tracking information shared between all instances of the class.
- In this example, we want a count of the number of object instances created from a class. So each instance of the class needs to increment that shared value. Static members are accessed using the class name and not an object variable. Let's try this out. Since we've been working with properties so far, let's use the `static` keyword on a property. In the customer class, let's add an auto implemented property using a snippet. Remember the shortcut; prop, Tab, Tab.

```csharp{17}
// Customer.cs
namespace ACM.BL
{
    public class Customer
    {
        public int CustomerId { get; set;}
        public string EmailAddress { get; set;}
        public string FirstName { get; set;}
        public string LastName { get; set;}
        public string FullName
        {
            get
            {
                return FirstName + " " + LastName;
            }
        }
        public static int InstanceCount { get; set;}
    }
}
```

Let's define it as an int, Tab, and call it `InstanceCount`. We want to share this count with all object instances, so we add the `static` modifier. Using the `static` modifier on a class member denotes that the member belongs to the class itself rather than to any specific instance. To see how that works, let's go back to our `CustomerTests` and add a test for our static property.

How to tests our logic with unit tests

```csharp{}
// CustomerTests.cs
using xunit;

namespace ACM.Tests
{
    public class CustomerTests
    {

    }
}
```

- We create three new customers using the `new` keyword. The object variables `c1`, `c2`, and `c3` all reference different customers each with a unique `FirstName`.
- If we access the object variable `c1` and drop down IntelliSense, we see that the InstanceCount property is not there.
- To _access a static property_, we use the class name itself. Type `Customer.`, and we now see the `InstanceCount` property. In this test, we increment this property after each object is created to count the instances. The resulting value should be 3. Open the Test Explorer, pin it, and run this test. It passes.

## Testing a class

We are building our business layer independent from any user interface. How are we going to try it out? We can't run a DLL component.

```csharp{}
// CustomerTests.cs
using xunit;

namespace ACM.Tests
{
    public class CustomerTests
    {
        // Test instance Properties
        [Fact]
        public void Customer_Valid_FullName()
        {
            // Arrange
            var customer = new Customer();
            customer.FirstName = "Bilbo";
            customer.LastName = "Baggins";
            string expected = "Bilbo Baggins"

            // Act
            var actual = customer.FullName;

            // Assert
            Assert.Equal(expected, actual);
        }

        // Test class Properties
        [Fact]
        public void Customer_Static()
        {
            // Arrange
            var c1 = new Customer();
            c1.InstanceCount += 1;
            c1.FirstName = "Bilbo";

            var c2 = new Customer();
            c2.InstanceCount += 1;
            c2.FirstName = "Frodo";

            var c3 = new Customer();
            c3.InstanceCount += 1;
            c3.FirstName = "Baggins";

            // Act

            // Assert
            Assert.Equal(3, Customer.InstanceCount); // 3
        }
    }
}
```

The best way to try out our code is to write a unit test. A unit test is another piece of code whose sole purpose is to test a particular unit, or piece of our code. We normally write unit tests for each property and method in our class. These often include tests with valid values, tests with invalid values, and tests for any corner cases. In this example, we test the FullName property. This is the test with valid values. We could also write tests for invalid values such as null or empty first or last name. There are several common techniques for organizing the code in a unit test. I use the Arrange, Act, Assert structure. In the Arrange section, we set up for our test. In this example, we create an instance of the class using the new keyword. We then use that instance to set test data in the properties. Lastly, we define the expected result of the test. In the Act section, we access the property or method we are testing. In the Assert section, we determine if our test was successful. We use the .NET Assert class to assert that our expected value and our actual value are equal. If they are equal, the test passes, otherwise, it fails

## Buidling Remaining classes

Final cut off of Cutomer class

```csharp
// Customer.cs
using System.Collection.Generics;

namespace ACM.BL
{
    public class Customer
    {
        public Customer()
        {
        }

        public Customer(int customerId)
        {
            CustomerId = customerId;
        }

        private string _lastName;
        public int CustomerId {get; private set;}
        public string EmailAddress {get; set;}
        public string FirstName {get; set;}
        public string LastName {
            get => _lastName;
            set =>_lastName = value
        }
        public string FullName {
            get
            {
                return FirstName + " " + LastName;
            }
        }
        public static int InstanceCount {get; set;}

        ///<summary>
        /// validates the customer data
        ///</summary>
        ///<returns><returns>
        public bool Validate()
        {
            return !string.IsNullOrWhiteSpace(FullName);
        }

        ///<summary>
        /// retrives all customer data
        ///</summary>
        ///<returns><returns>
        public List<Customer> Retrieve()
        {
            // code that retrieve all customers from data store
            return new List<Customer>();
        }

        ///<summary>
        /// retrives customer data by id
        ///</summary>
        ///<returns><returns>
        public Customer Retrieve(int customerId)
        {
            // code that retrieve customer from data store
            return new Customer();
        }

        ///<summary>
        /// persist customer data
        ///</summary>
        ///<returns><returns>
        public bool Save()
        {
            // code that persist customer to data store
            return true;
        }
    }
}
```

![Remaining classes](./../../../../../../src/images/09_dotnet/c/oops/boop-16.png)

```csharp
using System.Collection.Generics;

namespace ACM.BL
{
    public class Product
    {
        public Product()
        {
        }

        public Product(int productId)
        {
            ProductId = productId
        }

        public int ProductId {get; set;}
        public string ProductDescription {get; set;}
        public string ProductName {get; set;}
        public decimal? CurrentPrice {get; set;}

        ///<summary>
        /// validates the product data
        ///</summary>
        ///<returns><returns>
        public bool Validate()
        {
            return !string.IsNullOrWhiteSpace(ProductName) && CurrentPrice is not null;
        }

        ///<summary>
        /// retrives all product data
        ///</summary>
        ///<returns><returns>
        public List<Product> Retrieve()
        {
            // code that retrieve all products from data store
            return new List<Product>();
        }

        ///<summary>
        /// retrives product data by id
        ///</summary>
        ///<returns><returns>
        public Product Retrieve(int productId)
        {
            // code that retrieve product from data store
            return new Product();
        }

        ///<summary>
        /// persist product data
        ///</summary>
        ///<returns><returns>
        public bool Save()
        {
            // code that persist customer to data store
            return true;
        }

    }
}
```

```csharp
using System.Collection.Generics;

namespace ACM.BL
{
    public class Order
    {
        public Order()
        {
        }

        public Order(int orderId)
        {
            OrderId = orderId
        }

        public int OrderId {get; set;}
        public DateTimeOffet? OrderDate {get; set;}
        public Customer Customer {get; set;}
        public List<OrderItem> OrderItems {get; set;}

        ///<summary>
        /// validates the Order data
        ///</summary>
        ///<returns><returns>
        public bool Validate()
        {
            return OrderDate is not null;
        }

        ///<summary>
        /// retrives all order data
        ///</summary>
        ///<returns><returns>
        public List<Order> Retrieve()
        {
            // code that retrieve all products from data store
            return new List<Order>();
        }

        ///<summary>
        /// retrives order data by id
        ///</summary>
        ///<returns><returns>
        public Order Retrieve(int orderId)
        {
            // code that retrieve product from data store
            return new Order();
        }

        ///<summary>
        /// persist order data
        ///</summary>
        ///<returns><returns>
        public bool Save()
        {
            // code that persist order to data store
            return true;
        }

    }
}
```

```csharp
using System.Collection.Generics;

namespace ACM.BL
{
    public class OrderItem
    {
        public OrderItem()
        {
        }

        public OrderItem(int orderItemId)
        {
            OrderItemId = orderItemId
        }

        public int OrderItemId {get; set;}
        public int ProductId {get; set;}
        public decimal? PurchasePrice {get; set;}
        public int Quantity {get; set;}

        ///<summary>
        /// validates the Order data
        ///</summary>
        ///<returns><returns>
        public bool Validate()
        {
            return Quantity > 0 && ProductId > 0 && PurchasePrice is not null;
        }

        ///<summary>
        /// retrives all order item data
        ///</summary>
        ///<returns><returns>
        public List<OrderItem> Retrieve()
        {
            // code that retrieve all products from data store
            return new List<OrderItem>();
        }

        ///<summary>
        /// retrives order item data by id
        ///</summary>
        ///<returns><returns>
        public OrderItem Retrieve(int orderItemId)
        {
            // code that retrieve product from data store
            return new OrderItem();
        }

        ///<summary>
        /// persist order item data
        ///</summary>
        ///<returns><returns>
        public bool Save()
        {
            // code that persist order to data store
            return true;
        }
    }
}
```

We now have created all the classes, but are they right classes?

`❓ are they taking too much responsibility`

![Too much responsibility with common methods](./../../../../../../src/images/09_dotnet/c/oops/boop-1.png)

## Summary

![Layering the app](./../../../../../../src/images/09_dotnet/c/oops/boop-8.png)

![building a class](./../../../../../../src/images/09_dotnet/c/oops/boop-9.png)

![Defining Properties Manually](./../../../../../../src/images/09_dotnet/c/oops/boop-10.png)

![Unit Testing](./../../../../../../src/images/09_dotnet/c/oops/boop-11.png)

![Working with Objects](./../../../../../../src/images/09_dotnet/c/oops/boop-12.png)

![Creating Methods](./../../../../../../src/images/09_dotnet/c/oops/boop-13.png)

![Unit Testing Methods](./../../../../../../src/images/09_dotnet/c/oops/boop-14.png)

![Method Terminology](./../../../../../../src/images/09_dotnet/c/oops/boop-15.png)
