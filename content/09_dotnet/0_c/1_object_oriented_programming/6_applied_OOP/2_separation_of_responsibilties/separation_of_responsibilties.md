---
title: "Separation of Resposibilities"
slug: "09_dotnet/0_c/1_object_oriented_programming/6_applied_OOP/2_separation_of_responsibilties"
stack: "C#.NET"
---

Our `Customer` class creates new customers and validates customer data. It has methods to retrieve existing customer data and save changes, and we have not even considered how to manage addresses. Sounds like the `Customer` class is trying to do too much.

This module details how to keep our classes focused by separating responsibilities to other classes by understanding with an example

![When a business is small, it's easy for the president of the company to be responsible for everything; sales, marketing, operations, and so on](./../../../../../../src/images/09_dotnet/c/oops/coop-1.png)

![As the company grows, getting more customers and more employees, this is no longer practical. The president needs to delegate some responsibilities to others](./../../../../../../src/images/09_dotnet/c/oops/coop-2.png)

- The same is true as we build our applications. When a class has few responsibilities, it's easy for that class to contain all of the code to handle those responsibilities. As an application grows, the class can take on more responsibilities than it can manage by itself.

So, we think through the responsibilities of our classes and make them more focused by delegating appropriate responsibilities to other classes.

## Separation of Concern

![Object Oriented Prgramming](./../../../../../../src/images/09_dotnet/c/oops/coop-3.png)

- The second key step in building an object- oriented application is to look at each of the resulting classes and determine whether it is focused or taking on too much responsibility. `Does the class need to do everything specified for it or should it be broken into additional classes❓`
- This step follows the **principle of separation of concerns**. The idea is that an application should be decomposed into parts with minimal overlap and each part responsible for a separate concern.
- Separating responsibilities _minimizes coupling_, _maximizes cohesion_, _simplifies maintenance_, and _improves testability_, and who wouldn't want that?

Let's look at each of these factors in detail.

> **Coupling** is the degree to which classes are dependent on other classes or external resources.

- The fewer dependencies the class has, the easier it is to write, test, maintain, and update over time.
- If there are too many dependencies in a class, consider moving some of those dependencies to another class.

![Minimizing Coupling](./../../../../../../src/images/09_dotnet/c/oops/coop-4.png)

For eg, each of these classes has code to `retrieve` and `save` data using the data access layer, making them tightly coupled to that layer. We can reduce that coupling by extracting the retrieve and save operations into separate classes.

![Maximizing Cohesion](./../../../../../../src/images/09_dotnet/c/oops/coop-5.png)

> **Cohesion** is a measure of how related everything in a class is to the purpose of the class.

- If there are properties or methods in a class that are not truly related to the purpose of the class, they should be moved to another class.
- For eg, there is a lot of work required to manage an address. There are quite a few properties, and there are requirements such as appropriate address formatting based on the country.

`❓Does it really make sense for the customer to manage all of this and the order as well❓`

By moving address functionality into its own class, we maximize cohesion in each class.

`❓Why bother concerning ourselves with coupling and cohesion`

![Coupling and Cohesion](./../../../../../../src/images/09_dotnet/c/oops/coop-6.png)

- When there is `low coupling`:
  - There is a reduced probability that changes to one class adversely affects other classes, making maintenance easier.
  - Makes testing more straightforward because the class has minimal dependencies on other classes.
- When there is `high cohesion`:
  - There is a higher probability that a feature request will affect only a small number of classes, simplifying maintenance.
  - Helps produce a focused, well-defined, and complete class, making it easier to understand and test.

✏️: **Classes with both `low coupling` and `high cohesion` are easier to understand, test, maintain, and extend**.
Let's take another look at our entity classes and see if they have any responsibilities that can be best be delegated to other classes.

## Revisiting Class diagram

Let's start with the Customer class. Yes, the Customer class needs to track the customer's name.

![Separating Responsibilities With YAGNI](./../../../../../../src/images/09_dotnet/c/oops/coop-7.png)

Email address? Maybe. If the application allowed tracking of multiple email addresses for a customer, then maybe not. To make our decision, we go back to the subject matter experts and ask about the email address. The answer is that they currently only want to track one email address. They may change their minds about this sometime in the future.

`❓Okay, but should we deal with multiple email addresses now, just in case`

Following the `YAGNI` principle, which stands for, **Y**ou **A**ren't **G**oing to **N**eed **I**t, don't put in any feature that may be needed in the future. So we'll leave it as a single email address property in the `Customer`class.

`❓How about the home and work addresses`.

An address requires quite a few properties; multiple lines for a `street address`, `city`, `state`, `province`, `zip code`, or other `postal code`, `country`, and an `address type` to identify whether an address is for home or work or whatever. Plus, there are specific business rules and different address formats for different countries. _This sounds like something that has enough functionality to stand on its own._

![Separating Address Responsibility from Customer](./../../../../../../src/images/09_dotnet/c/oops/coop-8.png)

Let's define an Address class to take on those responsibilities. Notice that we still have the address fields in the Customer class, but now they are simple instances of our new Address class.
Now how about the methods in our Customer class?

- `Validate`? Yeah, that makes sense. The Customer class should be responsible for validating its own data.
- `Retrieve`? Hmmm, depending on the data access technology you are using; Entity Framework, ADO.NET, or some other third-party framework, the code in the retrieve could be extensive and complex. It doesn't make sense for the Customer class to take on the responsibility of retrieving the data from the data store.
- `Save`?, same thing.

Since both the retrieve and save are dealing with the data store, it would make sense to put both of those responsibilities together in a separate class.

![Separating Customer CustomerRepository and Address](./../../../../../../src/images/09_dotnet/c/oops/coop-9.png)

- By convention, `the class responsible for retrieving and saving the data for an entity is called a Repository class`. The customer repository includes methods such as

`Retrieve` and `Save`.
✏️: As we just discussed, a common practice when separating responsibilities is to put code dealing with a data store into its own class.

- There are many other common practices for defining an appropriate set of classes and their associated relationships. These common practices are called `design patterns`.

There is a design pattern called the `repository pattern`, which we are using in a simplified form here.

![Separating Responsibilities](./../../../../../../src/images/09_dotnet/c/oops/coop-10.png)

Now let's look at the Product and Order classes. It makes sense to use the repository pattern for them as well. Each Repository class includes methods such as the Retrieve and Save, but what about Order Item? We'll talk about that class in the next module. For now, let's build these new classes.

## Building Address and Respository Classes

#### Address class

```csharp
// Address.cs
using System.Collection.Generics;

namespace ACM.BL
{
    public class Address
    {
        public Address(){}
        public Address(int addressId)
        {
            AddressId = addressId;
        }

        public int AddressId {get; set;}

        public int AddressType {get; set;}

        public string City {get; set;}

        public string Country {get; set;}

        public string PostalCode {get; set;}

        public string State {get; set;}

        public string StreetLine1 {get; set;}

        public string StreetLine2 {get; set;}


        ///<summary>
        /// validates the adress data
        ///</summary>
        ///<returns><returns>
        public bool Validate()
        {
            return PostalCode is not null;
        }

    }
}
```

#### CustomerRespository Class

```csharp
using System.Collection.Generics;
using ACM.BL;

namespace ACM.DL
{
    public class CustomerRespositry
    {

        ///<summary>
        /// retrives all order item data
        ///</summary>
        ///<returns><returns>
        public List<Customer> Retrieve()
        {
            // code that retrieve all products from data store
            return new List<Customer>();
        }

        ///<summary>
        /// retrives order item data by id
        ///</summary>
        ///<returns><returns>
        public Customer Retrieve(int customerId)
        {
            // create instance of Customer class
            // Pass requested Id
            var customer = new Customer(customerId);

            // hard-coded to retrieve defined customer
            if(customerId == 1)
            {
                customer.FirstName = "Bilbo";
                customer.LastName = "Baggins";
                customer.EmailAddress = "bilbo@baggins.com";
            }

            return customer;
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

#### ProductRespository Class

```csharp
using System.Collection.Generics;
using ACM.BL;

namespace ACM.DL
{
    public class ProductRespositry
    {

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

            return product;
        }

        ///<summary>
        /// persist product data
        ///</summary>
        ///<returns><returns>
        public bool Save()
        {
            // code that persist product to data store
            return true;
        }
    }
}
```

#### OrderRespository Class

```csharp
using System.Collection.Generics;
using ACM.BL;

namespace ACM.DL
{
    public class OrderRespositry
    {

        ///<summary>
        /// retrives all order data
        ///</summary>
        ///<returns><returns>
        public List<Order> Retrieve()
        {
            // code that retrieve all Orders from data store
            return new List<Order>();
        }

        ///<summary>
        /// retrives order data by id
        ///</summary>
        ///<returns><returns>
        public Order Retrieve(int orderId)
        {
            // create instance of Order class
            // Pass requested Id
            var order = new Order(orderId);

            // hard-coded to retrieve defined customer
            if(orderId == 0)
            {
                order.OrderDate = new DateTimeOffset(DateTime.Now.year, 4, 14, 10, 00, 00, new TimeSpan(7, 0, 0));
            }

            return order;
        }

        ///<summary>
        /// persist product data
        ///</summary>
        ///<returns><returns>
        public bool Save()
        {
            // code that persist product to data store
            return true;
        }
    }
}
```

We have now successfully separated the responsibilities in our entity classes to minimize coupling and maximize cohesion, leaving us with more focused classes. All the logic to manage addresses is in a separate Address class, and code that accesses the data store is in Repository classes. Let's finish this module with some checklists we can use as we evaluate our classes and separate out responsibilities.

## Testing class

```csharp
// AddressTests.cs coming soon...
```
```csharp
// CustomerRepositoryTests.cs coming soon...
```
```csharp
// ProductRepositoryTest.cs coming soon...
```
```csharp
// OrderRepositoryTest.cs coming soon...
```

## Summary

![Evaluate Coupling](./../../../../../../src/images/09_dotnet/c/oops/coop-11.png)

![Evaluate Cohesion](./../../../../../../src/images/09_dotnet/c/oops/coop-12.png)

![Additinal Concepts](./../../../../../../src/images/09_dotnet/c/oops/coop-13.png)

