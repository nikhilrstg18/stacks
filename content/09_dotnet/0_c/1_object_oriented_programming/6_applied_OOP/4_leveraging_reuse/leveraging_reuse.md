---
title: "Leveraging Reuse"
slug: "09_dotnet/0_c/1_object_oriented_programming/6_applied_OOP/4_leveraging_reuse"
stack: "C#.NET"
---

It is said that the power of object- oriented programming is in its promise of reuse.This module demonstrates how to leverage reuse through inheritance.

![Identifying Classes](../../../../../../src/images/09_dotnet/c/oops/eoop-1.png)

We've already identified the first cut of our classes with their properties and methods using the words from the requirements.

![Separating Responsibilities](../../../../../../src/images/09_dotnet/c/oops/eoop-2.png)
We analyzed the responsibilities of those classes and moved some of those responsibilities to other classes. This keeps each class focused on its purpose.

![Establishing Relationships](../../../../../../src/images/09_dotnet/c/oops/eoop-3.png)

We then identified and implemented the relationships between those classes. The relationships define how the objects interact and work together to perform the operations of the application.

![Object Oriented Prgramming](../../../../../../src/images/09_dotnet/c/oops/eoop-4.png)

The fourth key task when building an object-oriented application is to leverage reuse. For existing code, this involves locating similar functionality and extracting that commonality into reusable classes or components. This task can also involve some precognition, identifying potential commonality and building reusable common classes and components, and interfaces.

![Techniques for Leveraging Reuse](../../../../../../src/images/09_dotnet/c/oops/eoop-5.png)

- We can use object-oriented programming techniques to leverage reuse, build a class with common functionality, and share it through collaboration or composition. We saw this in action with the Address class. Any class can reuse the Address class to manage address functionality.
- Extract common code into a base class, and inherit from that class. Each child class reuses the properties and behaviors of the base class.
- Build fully encapsulated components. For example, we could build a library of common utilities and reuse them in any application.
- Define interfaces to work with a set of classes in a common, reusable way.
- Copy and paste. Yeah, we could copy some code and paste it to reuse it. This is often jokingly called cut and paste inheritance. But by making a copy of the code, there are then two or more places that the code resides. When a bug is found in one copy, someone needs to remember to update every other copy. This takes time and is prone to error, so it's not a great idea.

We looked at collaboration and composition earlier in this course. We build a reusable component and examine interfaces later in this course. The remainder of this module focuses on inheritance.

![outline](../../../../../../src/images/09_dotnet/c/oops/eoop-6.png)

We begin with a look at the .NET Object class as an example of leveraging reuse through inheritance. Sometimes you want different functionality than a base class provides. In that case, you can override the default base class functionality and provide a more specific implementation. We'll dive into this concept and look at an example. We then cover polymorphism, which is the fourth and final pillar of object-oriented programming. Lastly, we build our own base class with common functionality for all the entity classes and demonstrate how to inherit from this base class.

Before we get started, let's look at the secrets of reuse.

## Secrets of Reuse

![Secrets of Reuse](../../../../../../src/images/09_dotnet/c/oops/eoop-7.png)

Let me tell you the secrets of reuse success.

- Build a functionality once.
- Test that functionality with unit tests. Be sure to retain the tests for regression testing.
- Of course, the most important part, actually reuse the resulting class, component or interface. This may require some processes to ensure all team members know what is available for reuse.
- And if you need to later update, extend, or enhance that functionality, you only have to enhance it in one place. When a bug is found or a change is required, update that functionality once and retest it. All the code that reuses the shared functionality will immediately have the fix or support the new feature.

![Advantages of Reuse](../../../../../../src/images/09_dotnet/c/oops/eoop-8.png)

Reusing existing classes, components, and interfaces has many advantages.

- It reduces the amount of code you need to write
- which reduces the development and maintenance time
- and associated costs.
- Plus, it reduces bugs because the reused piece can be tested independently.

Now let's get started with a look at techniques for leveraging reuse through inheritance.

## .Net Class Object

![Inheritance](../../../../../../src/images/09_dotnet/c/oops/eoop-9.png)

We've been talking about inheritance for a while now. We talked about how we could define an inheritance relationship for our customer types, but since we didn't need any specific properties or behavior in our derived classes, we opted to implement our customer type as a simple integer property. So you may have been wondering when you would see inheritance implemented, but actually you've already been using inheritance in the demonstrations so far.

`❓How, you ask`
.NET has a class called object. This name is a bit confusing because the object class is not an object, it's a class named Object.

![.Net class objects](../../../../../../src/images/09_dotnet/c/oops/eoop-10.png)

Every class we create, and I mean every class we create, inherits from this Object class. Since every class inherits from this Object class, all the members defined in the Object class are available and reusable from the derived classes.

Let's take a look. We are back in Visual Studio with the ProductRepository class open. Let's try a few things here.
![VS-1](../../../../../../src/images/09_dotnet/c/oops/eoop-11.png)

Since the built-in .NET object is a class, we can create an instance of it; Object myObject = new Object. If we type myObject., we see the list of methods available on the object class.

![VS-2](../../../../../../src/images/09_dotnet/c/oops/eoop-12.png)

The ToString method returns a string representing the current instance of the class.

✏️: The default implementation of the ToString method in the Object class returns the fully qualified name of the type.

```csharp {27-29}
using System.Collection.Generics;
using ACM.BL;

namespace ACM.DL
{
    public class ProductRespositry
    {
        //...

        ///<summary>
        /// retrives product data by id
        ///</summary>
        ///<returns><returns>
        public Product Retrieve(int productId)
        {
            // create instance of Product class
            // Pass requested Id
            var product = new Product(productId);

            // hard-coded to retrieve defined customer
            if(productId == 2)
            {
                product.ProductName = "Sunflowers";
                product.ProductDescription = "Assorted set of 4 beringht yellow mini sunflowers";
                product.CurrentPrice = 15.99m;
            }
            var myObject = new Object();
            Console.WriteLine($"Object: {myObject.ToString()}");
            Console.WriteLine($"Product: {product.ToString()}");

            return product;
        }

        //...
    }
}
```

Let's write it out to the console using an interpolated string. Since every class we create automatically inherits from object, every object from each of our classes has a ToString method.

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
            return !string.IsNullOrWhiteSpace(ProductName)
                && CurrentPrice is not null;
        }
    }
}
```

Looking at the Product class, we didn't create a ToString method. But going back to the repository, if we type product., we see that our product instance does have a ToString method that it inherits from the .NET Object class. Let's write that out to the console as well.

✏️: that we did not have to define this inheritance relationship. When we create a class, .NET automatically inherits from the .NET Object class. We don't currently have a user interface to run this code, so we'll run it by executing the unit test

```csharp{20-22}
using xUnit;
using ACM.DL;

namespace ACM.Tests
{
    public class ProductRepositoryTests
    {
        [Fact]
        public void Test_Retrieve()
        {
            //Arrange
            var productRepo = new ProductRepository();
            //Act
            var product = productRepo.Retrieve(1);
            //Assert
            Assert.NotNull(product);
        }
    }
}
// output
// Object: System.Object
// Product: ACM.BL.Product
```

- Going back to the `ProductRepository` class, VS itself makes use of this inheritance relationship when displaying information while debugging. It uses the `ToString` method from the object class to display the fully qualified type name for any object variable in the tooltips.

![VS-3](../../../../../../src/images/09_dotnet/c/oops/eoop-13.png)

- To see what I mean, let's put a breakpoint in after we create the instance of our product so we can view the product object. In Test Explorer, right-click and select to debug the test so it'll stop on the breakpoint.
- Hover over the product instance variable. Notice the tooltip provides a string description of the class. Internally, VS is calling the `ToString` method. Since every class we create implicitly inherits from the Object class, VS can reuse the inherited properties and methods with any instance of any class. That makes features such as displaying the data tooltip possible. Click the red square to stop the test.
- The key point when leveraging reuse with inheritance is that every derived class has access to the properties and methods of the class it inherits from.
- Code in the base class is available for use by the derived classes, so we can call the Object class `ToString` method from the `Product` class, or from the `Customer` class, or from any class.
  ❓**But what if we want to change the functionality of one of the base class methods for a specific derived class**

## Overriding Base class functionality

In this demo, we override base class functionality for a specific derived class to provide a more specialized implementation.

Object: **System.Object**

Product: **ACM.BL.Product**

- Recall that the `ToString` method in the object class displays the name of the class type. For the `Object` class, it displays **System.Object**. For our `Product` class, it displays **ACM.BL.Product**.

- It would be much more useful if the `ToString` method provided a string more specific to the derived class, especially when used with debugging.

- For example, it would be great if the `Customer` class could write its own implementation of the `ToString` method that displayed the customer name. And the `Product` class could have its own implementation of `ToString` that displayed the product name. That way we could better see which object we are working with. Luckily for us, we can do just that. We can override the base class member in our derived classes.

- Let's override the `ToString` method in the `Product` class. With VS, it's easy to override any inherited member.

![VS-4](../../../../../../src/images/09_dotnet/c/oops/eoop-14.png)

1. Just type `override`, space, and IntelliSense provides the list of members available to override.
2. The list includes any overridable members in any class above it in the hierarchy. Our Product class inherits from object, so we see the object class's overridable members in the list. We'll pick `ToString`.

✏️: Not all members of a class are overridable. We'll talk more about that later in this module.

```csharp{31}
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
            return !string.IsNullOrWhiteSpace(ProductName)
                && CurrentPrice is not null;
        }

        public override string ToString() => ProductName;
    }
}
```

To check, we'll run it by executing the unit test

```csharp{20-22}
using xUnit;
using ACM.DL;

namespace ACM.Tests
{
    public class ProductRepositoryTests
    {
        [Fact]
        public void Test_Retrieve()
        {
            //Arrange
            var productRepo = new ProductRepository();
            //Act
            var product = productRepo.Retrieve(1);
            //Assert
            Assert.NotNull(product);
        }
    }
}
// output
// Object: System.Object
// Product: Sunflowers
```

in Similar fashion, we can override `ToString()` method of

- `Customer` class returning the full name

```csharp
//Customer.cs
public override string ToString() => FullName;
```

- `Order` class returning order date and id.

```csharp
//Order.cs
public override string ToString() => $"{OrderDate.Value.Date} ({OrderId})";
```

## Polymorphism

> In OOP, **polymorphism** is the concept that a single method, such as the `ToString` method, can behave differently depending on the type of object that calls it.

![Polymorphism](../../../../../../src/images/09_dotnet/c/oops/eoop-15.png)

- If the base class calls `ToString`, `ToString` displays the full class name.
- If an order object calls `ToString`, it displays the order date and ID.
- If a customer object calls `ToString`, it displays the customer's full name.
- If a product object calls `ToString`, it displays the product name.

So a method can have different shapes. The application determines which shape of the method to use at the time of execution based on the type of instance that called it.
This demonstrates _inheritance-based_ polymorphism, whereby a base class defines a method, and any derived class can override that method to provide its own implementation, basically providing its own shape for the method.
Polymorphism allows us to work with groups of classes in a uniform way. We saw this when we looked at the data tooltips. Visual Studio leverages polymorphism to display the appropriate information in the data tip based on the type of object. Now that we have covered how to use a base class and override its methods, let's see how to create a base class of our own.

## Building a Base class

So far, the demonstrations have pretty much ignored the save functionality.

❓**Why**

![Saving](../../../../../../src/images/09_dotnet/c/oops/eoop-16.png)

Because there's all sorts of fiddliness involved when we have to actually save data.

- Is it a new item?
  - Then there may be specialized operations to perform. To track if the item is new, each entity class needs an IsNew property.
- Is the data actually changed?
  - If we display data to a user, they may look at it and not actually change anything, so we don't need to save it. To track whether the user has made changes, each entity class needs a HasChanges property.
- Is the data valid?
  - To track that, each entity class needs an IsValid property that calls its Validate method to determine if the data is valid.
- What if the user deleted the item?
  - It is normally good practice not to actually delete any data, especially if that data is related to other data in the application.
  - For example, an order is associated with a customer. If the customer is deleted, the order can't be displayed. Instead, add an EntityState property to track whether an item is active or deleted. So every entity needs another property; EntityState.

❓**Do we want to add each of these properties to every entity class**

I don't think so.

![Base Class](../../../../../../src/images/09_dotnet/c/oops/eoop-17.png)

Let's instead define a base class that has these properties. Every entity class can then inherit from this base class to access all these new properties. When building a base class, we have two choices. We can build an abstract class or a concrete class.

![Building a Base Class](../../../../../../src/images/09_dotnet/c/oops/eoop-18.png)

#### Abstract class

> An abstract class is an incomplete class with at least one property or method that has not been implemented.

- Because an abstract class is incomplete, it can't be instantiated. That means we can't use the new keyword to create one.
- An abstract class is intended for use as a base class, and not used on its own.
- Define an abstract class using the abstract keyword.

#### Concrete class

> A concrete class is a normal class like we've been creating so far in this course.

- A concrete class can be instantiated. That means we can use the new keyword to create one.
- A concrete class can be used as a base class or on its own.
- When creating a class, a concrete class is created by default.
- No additional keyword is required.

Our new EntityBase class is only meant to be used as a base class, so we'll build it as an abstract class.

#### Sealed class

![Sealed Class](../../../../../../src/images/09_dotnet/c/oops/eoop-19.png)

> A sealed class is a class that cannot be extended through inheritance.

- Sealing a class prevents extension and customization.
- If you build a class and want to ensure that no other classes extend or override its functionality, consider marking it as sealed.
- Seal a class using the sealed keyword.

Since we are building a base class, we want it to be extended and not sealed. But if we don't want any other code to extend our entity classes such as our customer or product classes, we could seal them.
Now, let's build our base class.

### Demo

We'll build the base class for our entity classes. In it, we'll declare the properties each entity class needs to perform the save operation.

![Demo: building a base class](../../../../../../src/images/09_dotnet/c/oops/eoop-20.png)

Create a base class like any other class. Right-click on the ACM.BL project, and select Add, Class. Name the class EntityBase. Ensure the class is public, and let's mark it as abstract so it can only be used as a base class.

```csharp
namespace ACM.BL
{
    public enum EntityStateOption
    {
        Active,
        Deleted

    }
    public abstract class EntityBase
    {
        public EntityStateOption EntityState {get; set;}
        public bool HasChanges {get; set;}
        public bool IsNew {get; private set;}
        public bool IsValid {
            get
            {
                return true;
            }
        }
    }
}
```

- The `IsNew` property defines whether the object represents a new entity such as a new customer.
  - For the `IsNew`, use `propg` to define a property with a getter and private setter
  - We don't want any other code defining whether the entity is new. It's a Boolean, and we'll call it IsNew

❓**What is the appropriate access modifier for this property**

- Use `public` if any class can access the property.
- Use `private` if only the base class can access this property.
- Use `protected` if the base class and all derived classes can access this property.

We could make **IsNew** `protected` so only the entity classes could access it, but we may want to also access it from the associative repository classes, so let's leave it `public`

- The `HasChanges` property defines whether the entity has been changed.

  - Use prop to create the property. It's also a Boolean.
  - We'll name it HasChanges, and we'll leave it public as well.

- `IsValid` defines whether the entity's data is currently valid.

  - It's a read-only property, and we'll call the entity's `Validate` method to determine if the class data is valid.
  - Each of our entity classes has a `Validate` method. So can we just call their Validate method here? Hmmm, no.
  - The base class does not know about the properties and methods defined in the child classes. We'll deal with that later. Let's just return true for now.

- `EntityState` defines whether the item is active or deleted.
  - For this property, we'll define an enum for the valid values; active and deleted.
  - Then use prop, set the type to that enum type, EntityStateOption, and call it EntityState. That's it.

Now that we have the base class in place, we can inherit from it. We want each of our entity classes to inherit from our `EntityBase` class.

- `Customer` IS-A `EntityBase`

```csharp
//Customer.cs
public class Customer:EntityBase
{
    //...
}
```

- `Order` IS-A `EntityBase`

```csharp
//Order.cs
public class Order:EntityBase
{
    //...
}
```

- `Product` IS-A `EntityBase`

```csharp
//Product.cs
public class Product:EntityBase
{
    //...
}
```

![Extending all Entity classes from EntityBase](../../../../../../src/images/09_dotnet/c/oops/eoop-21.png)

Let's try it out. Ensure that our breakpoint is still defined in the ProductRepository class. Then debug the ProductRepository RetrieveTest. Hover over the product, open the data tip, and we see that the product instance has all the base class properties.

```csharp {14-18}
namespace ACM.BL
{
    public enum EntityStateOption
    {
        Active,
        Deleted

    }
    public abstract class EntityBase
    {
        public EntityStateOption EntityState {get; set;}
        public bool HasChanges {get; set;}
        public bool IsNew {get; private set;}
        public bool IsValid => Validate();
        public bool Validate()
        {

        }
    }
}
```

- Looking back at the EntityBase class, let's revisit the IsValid property. We want this property to call the Validate method of the appropriate entity object. The IsValid property can't call our derived class validate methods, but it can call a local validate method.

- Let's add one here. Now we can call this method in our Validate getter. We are getting a quick action suggestion to convert this one-line getter to an expression body property. Let's take that suggestion and shorten our syntax. We'll ignore this error for now.

- The last step then is to simply override this `Validate` method in every entity class that inherits from this class. The `IsValid` property here in our base class makes use of polymorphism to call the correct shape of the validate method, calling the appropriate Validate function based on the entity type.

```csharp {25}
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
        public override bool Validate() //❌ <- Compilation Error
        {
            return !string.IsNullOrWhiteSpace(ProductName)
                && CurrentPrice is not null;
        }
    }
}
```

But it doesn't work. We see an error; can't override inherited member because it is not marked virtual, abstract, or override.

❓ **Now what**

## Preparing overridable Base class members

![Sealed Members](../../../../../../src/images/09_dotnet/c/oops/eoop-22.png)

? **When do we use which**

![Preparing overridable Base class members](../../../../../../src/images/09_dotnet/c/oops/eoop-23.png)

#### Abstract methods

> **Abstract methods** are just a placeholder with no implementation.

- Use `abstract` if the base class defines the method, but has no default code for the method.
- But note that we can only add abstract methods to an abstract class because defining an abstract method leaves our class incomplete.
- The derived class must then override each abstract method.
- Specify an abstract method using the `abstract` keyword.

#### Virtual methods

> **Virtual methods** have a default implementation that can optionally be overridden.

- We can add `virtual` methods to abstract or concrete classes.
- Use `virtual` if it makes sense to have default code in the method.
- The derived class then has the option to `override` any `virtual` method.
- Specify a virtual method using the `virtual` keyword.

Recall that earlier in this module, we overrode the `ToString` method. The `ToString` method is a `virtual` method. It had a default implementation it used if we didn't override it.

Our `EntityBase` class has no default validation logic. Only the entity classes have a logic to determine if their data is valid. So we'll use `abstract` for our base class `Validate` method.

```csharp {15}
namespace ACM.BL
{
    public enum EntityStateOption
    {
        Active,
        Deleted

    }
    public abstract class EntityBase
    {
        public EntityStateOption EntityState {get; set;}
        public bool HasChanges {get; set;}
        public bool IsNew {get; private set;}
        public bool IsValid => Validate();
        public abstract bool Validate();
    }
}
```

Let's give it a try. To prepare our base class member so it can be overridden, let's add the abstract keyword. An abstract method has no implementation, so we don't need a method body, and instead, add a semicolon.

```csharp {25}
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
        public override bool Validate() //✅ <- Compilation Error is fixed
        {
            return !string.IsNullOrWhiteSpace(ProductName)
                && CurrentPrice is not null;
        }
    }
}
```

Going back to the `Product` class, we see that our `Validate` method is valid, no syntax error. Our overridden method is called whenever the `IsValid` property is accessed on an instance of the `Product` class.

```csharp {10-38}
using System.Collection.Generics;
using ACM.BL;

namespace ACM.DL
{
    public class ProductRespositry
    {
        //...

        ///<summary>
        /// Persist product
        ///</summary>
        ///<returns><returns>
        public bool save(Product product)
        {
            var success = true;

            if(product.HasChanges)
            {
                if(product.IsValid)
                {
                    if(product.IsNew)
                    {
                        // call insert store sproc
                    }
                    else
                    {
                        // call update store sproc
                    }
                }
                else
                {
                    success = false;
                }

            }
            return success;
        }

        //...
    }
}
```

Now that we have our EntityBase properties in place, it's time to use their functionality. We'll use the EntityBase properties in our repository class Save method, starting with the ProductRepository.

- We first declare a variable defining whether the operation was successful, and set it to true.
- We check whether the product has changes. If it has no changes, we don't need to save.
- Then we check if it's valid. The IsValid will call our overridden Validate method.
- If the product has changed and is valid, we check the IsNew property to call either an insert or update operation.
- If the product is not valid, we return false.

We can check our logic, via unit tests as below

```csharp{19-43}
using xUnit;
using ACM.DL;

namespace ACM.Tests
{
    public class ProductRepositoryTests
    {
        [Fact]
        public void Test_Retrieve()
        {
            //Arrange
            var productRepo = new ProductRepository();
            //Act
            var product = productRepo.Retrieve(1);
            //Assert
            Assert.NotNull(product);
        }

        [Theory]
        [InlineData(true)]
        [InlindData(false)]
        public void Test_Save(bool valid)
        {
            //Arrange
            var productRepo = new ProductRepository();
            var updateProduct = new Product(1){
                CurrentPrice= valid ? 18M : null,
                ProductDescription="Assorted Size set of 4 Bright yellow mini sunflowers",
                ProductName = "Sunflowers",
                HasChanges = true
            }
            //Act
            var actual = productRepo.Save(updateProduct);
            //Assert
            if(valid)
            {
                Assert.True(actual);
            }
            else
            {
                Assert.False(actual);
            }
        }
    }
}
```

## Summary

![Inheritence](../../../../../../src/images/09_dotnet/c/oops/eoop-24.png)

- One of the driving forces behind object- oriented programming is reuse. This module focused on leveraging reuse through inheritance.
- With inheritance, we can define a base class with common functionality and inherit from that class to reuse that functionality.

![Abstract class](../../../../../../src/images/09_dotnet/c/oops/eoop-25.png)

- An abstract class is an incomplete class with one or more members that are not implemented. Because an abstract class is incomplete, it can't be instantiated, meaning we can't use the new keyword to create an instance.
- Use abstract when creating a base class. Each derived class then implements the members that are not implemented in the base class. Use the abstract keyword to define a class as an abstract class.

![Sealed class](../../../../../../src/images/09_dotnet/c/oops/eoop-26.png)

A sealed class is a concrete class that can't be extended through inheritance. Use the sealed keyword to prevent overriding the class functionality.

![Abstract vs Virutal Methods](../../../../../../src/images/09_dotnet/c/oops/eoop-27.png)

Before a base class method can be overridden, that method must be defined as abstract or virtual. An abstract method is a placeholder with no implementation. Use it if the base class does not have a default implementation for the method such as in our validate example. The method must then be overridden in the derived class. Abstract methods can only be used in an abstract class. A virtual method has a default implementation and can be used in an abstract or a concrete class. The method can be overridden in the derived class if needed.

![Pillars of OOP](../../../../../../src/images/09_dotnet/c/oops/eoop-28.png)

Here again are the pillars of object-oriented programming.

- **Abstraction** helps us map the business requirements to an initial set of classes.
- **Encapsulation** helps keep our properties and method code protected within the class and only accessible through a public programming interface.
- **Inheritance** helps us reuse code by inheriting properties and methods from a base class.
- **Polymorphism** is the fourth and final key characteristic of OOP.
  - It allows us to write a method with many shapes.
  - A single method such as `ToString` or `Validate` can behave differently depending on the type of object that calls it. That gives us the ability to override base class methods in the derived class to provide more unique functionality.
