---
title: "Establishing Relationships"
slug: "09_dotnet/0_c/1_object_oriented_programming/6_applied_OOP/3_establishing_relationships"
stack: "C#.NET"
---

Our classes need to relate to each other so they can interact. This module walks through how to define the relationships between classes and implement those relationships in code.
![Identifying Classes ✅](../../../../../../src/images/09_dotnet/c/oops/doop-1.png)
Looking at the list of tasks for building an object-oriented application, we've identified the first cut of our classes with their properties and methods.

![Separating Responsibilties ✅](../../../../../../src/images/09_dotnet/c/oops/doop-2.png)
We analyzed the responsibilities of those classes and moved some of those responsibilities to other classes to minimize coupling and maximize cohesion.

![Establishing Relationships](../../../../../../src/images/09_dotnet/c/oops/doop-3.png)

The third key step is to look at the `relationships` between those classes. The _relationships define how the objects interact and work together to perform the operations of the application_.

![Working Together 1](../../../../../../src/images/09_dotnet/c/oops/doop-4.png)

- To interact and communicate, there must be a relationship between the objects. Take, for eg., a feature to display an order.
  - Here is a user interface component with a form to display an order summary.
  - Here is the business logic component with `OrderRepository`, `Order`, and `OrderItem` classes. As its name suggests, the order summary form displays a summary of an order.

![Working Together 2](../../../../../../src/images/09_dotnet/c/oops/doop-5.png)

- To get the data to display,
  - it creates an instance of the `OrderRepository` class and uses the resulting object to call its `Retrieve` method.
  - The `OrderRepository` `Retrieve` method retrieves order information from a data store.
  - It creates an `Order` object and uses it to populate the properties of the order with the data retrieved from the data store.
  - The order summary also needs the `OrderItem` detail. So the `OrderRepository` creates `OrderItem` objects for each product included in that order and populates the properties of each order item.

![Working Together 3](../../../../../../src/images/09_dotnet/c/oops/doop-6.png)

- The `OrderRepository` `Retrieve` method then returns the fully populated `Order` and `OrderItem` objects to the user interface. The form uses these objects to display the order and order item data on the form. This example shows how relationships between these classes allow the objects to work together to perform a specific operation.

![Outline](../../../../../../src/images/09_dotnet/c/oops/doop-7.png)

- In this module, we begin by defining relationships between our classes.
- Then we more formally identify the basic types of relationships in object-oriented programming and examine those types in detail, starting with `collaboration` and `composition`.
- We implement composition two different ways `using object references` and `using IDs`.
- Lastly, we examine another type of relationship; `inheritance`. Let's get started.

## Defining Relationships

- These are the classes that we have defined so far. Let's remove the list of properties and methods and rearrange the classes so we can see the relationships more easily, and let's add an address repository to retrieve and save address information.
- If the Customer class was the only class with an address, we could consider skipping the `AddressRepository` and instead serializing the address information with the customer information, but since we have an address in both the `Customer` class and the `Order` class, we want the address to retrieve and save separately.

![Defining Relationships](../../../../../../src/images/09_dotnet/c/oops/doop-8.png)

To define the appropriate relationships, let's start with the `Customer` class.

- The customer class has a `HomeAddress` and an `OfficeAddress`, so the customer and address are related.
- Looking at the `Order` class, the `Order` has a `Customer`, has a `ShippingAddress`, and it has a set of order items.
- Each `OrderItem` must be associated with a `Product` because only products that the company has can be ordered.
- And looking at the repository classes,
  - the `ProductRepository` populates or saves an instance of the `Product` class.
  - The `OrderRepository` populates or saves an instance of the `Order` class, and so on.

So these are the many relationships between our classes. But before we implement these relationships, it's important to understand what type of relationships these are.

## Types of Relationships

Object Oriented Programming defines 3 basic types of relationships

1. Collaboration
2. Composition
3. Inheritance

#### Collaboration `USES-A`

> Collaboration defines a relationship where one object collaborates with, or uses, another object that is not otherwise related.
> For eg, you may collaborate with a coworker to complete a task.

![Collaboration aka `USES-A` relationship](../../../../../../src/images/09_dotnet/c/oops/doop-9.png)

In our class diagram, the `CustomerRrepository` **USES-A** `Customer` object to populate on a retrieve.

#### Composition `HAS-A`

> Composition defines the relationship where an object is composed of other objects it needs.

For eg, a Car has a Motor and has a SteeringWheel.

![Composition aka `HAS-A` relationship](../../../../../../src/images/09_dotnet/c/oops/doop-10.png)

In our class diagram, an `Order` has a `Customer`, an `Order` has a `ShippingAddress`, and an order has a set of `OrderItems`. Without those, it's not much of an order.
You may see the **Has-A** relationship broken into two distinct categories.

##### Aggregation

> When an object is composed of multiple objects that can exist outside of the relationship.

![Aggregation](../../../../../../src/images/09_dotnet/c/oops/doop-11.png)

For eg, an `Order` has a `Customer`, but a `Customer` can exist without the Order. The relationship is simply aggregating, or bringing together, the objects for a purpose

##### Composition

> Composition is then limited to those relationships where the related objects don't otherwise exist.

![Composition](../../../../../../src/images/09_dotnet/c/oops/doop-12.png)

- The object owns its related objects, and if the object is destroyed, the related objects are also destroyed.

For eg, an `Order` has a set of `OrderItems`. The `OrderItems` have no context without an order.

#### Inheritance `IS-A`

![Inheritance aka `IS-A` relationship](../../../../../../src/images/09_dotnet/c/oops/doop-13.png)

- Inheritance is the third type of relationship defined in object-oriented programming. We don't yet have an inheritance relationship in our class diagram.
- Conceptually, we could define a business type of customer is a customer, a residential type of customer is a customer, and so on. As you think about the relationships between your classes, keep in mind that we are not looking at general relationships, but rather relationships with respect to our application requirements.
- We don't care if a customer has a pet for our particular application, but we do care that the customer has an address.

## Collaboration - `USES-A` relationship

![Collaboration `USES-A` relationship](../../../../../../src/images/09_dotnet/c/oops/doop-14.png)

> A collaboration, uses a relationship exists whenever an object from one class uses one or more instances of another class it is not otherwise related to.

- At run time, objects interact by providing services to each other. The entity repository relationships are an example of this type.
- The `CustomerRepository` uses a customer object to populate on a retrieve and to serialize on a save. Same for the `Order`, `Product`, and `Address` repositories.

Let's see what collaboration looks like in the code. Here we are back in Visual Studio with the ACM solution open. The repository classes we have created are all similar, so let's look at the `CustomerRepository` as an example.

```csharp{25-27, 40-44}
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
        public bool Save(Customer customer)
        {
            // code that persist order to data store
            return true;
        }

    }
}
```

- In the `Retrieve` method, the repository uses an entity class to create a new instance and populate it from information in the data store. At this point, we have simply hard coded values. This allows us to run the code without having the data access layer in place.

- In the `Save`, the repository uses a entity class, taking in a customer instance as a parameter. It can then use the information from that instance to save the information to the data store. Recognize a collaborative relationship when you see a class use an instance of an otherwise unrelated class to perform an operation. So that's an example of collaboration. Next, let's look at composition.

## Composition - `HAS-A` relationship

![Composition `HAS-A` relationship](../../../../../../src/images/09_dotnet/c/oops/doop-15.png)

> A composition, `has-a` relationship exists whenever an object from one class is composed of one or more objects from another class.

The customer address relationship is an example of this type. The Customer class has a home address and has a work address. The order is also composed of other objects. Each order has a customer, each order has a shipping address, each order has a set of order items, and each order item has a product.

`❓How do we implement these relationships`

![Composition `HAS-A` relationship](../../../../../../src/images/09_dotnet/c/oops/doop-16.png)

- Composite objects often contain references to their constituent objects as properties. The `Customer` class has `HomeAddress` and `WorkAddress` properties. The `Order` class has customer, `ShippingAddress`, and `OrderItem` properties. The `OrderItem`class has a `Product` property.
- Composite relationships also have a cardinality, that is to say they have a one-to-one (1:1), one-to-many (1:N), or many-to-many (N:N) relationship. For eg,

![`HAS-A` relationship - 1:1](../../../../../../src/images/09_dotnet/c/oops/doop-17.png)

each order has one and only one customer.

![`HAS-A` relationship - 1:N](../../../../../../src/images/09_dotnet/c/oops/doop-18.png)

Each order has one or more order items.
Let's see what composition relationships look like in code.

#### Composition : References

This demo implements a composition relationship, specifically the customer address relationship. We are looking at the `Customer` class. According to the application specification, each customer has a home address and has an office address. When creating a customer object at run time, the customer object references two address objects; one for the home address and one for the work address.

```csharp{19-21, 23}
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

        ///	We could add two properties , each of type Address
        // public Address WorkAddress{get; set;}
        // public Address HomeAddress{get; set;}

        public List<Address> Addresses{get; set;}

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

        // ...Methods
    }
}
```

- Alternatively, we could create a list of addresses that more easily allows for any number of related addresses. So that's it. A simple property establishes the composition or has a relationship between the Customer class and Address class.
- But there is one small issue we should consider when using a list as one of the properties.

`❓The list does not have a good default value.`

✏️: we talked about constructors. A constructor should ensure that an object is in a valid state when the object is constructed.

- We didn't initialize our customerId or string values because the system initialized those types to default values for us.
- But for a list, the default is null. If any code attempts to access the AddressList property, the code will throw a null value exception.

```csharp{8,12, 15, 20-22, 24}
// Customer.cs
using System.Collection.Generics;

namespace ACM.BL
{
    public class Customer
    {
        public Customer() : this(0) // CTOR chaining
        {
        }

        public Customer(int customerId)
        {
            CustomerId = customerId;
            Addresses = new List<Address>();
        }

        private string _lastName;

        ///	We could add two properties , each of type Address
        // public Address WorkAddress{get; set;}
        // public Address HomeAddress{get; set;}

        public List<Address> Addresses{get; set;}

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

        // ...Methods
    }
}
```

- We could add this same line of code to the default constructor, but then we have repeated code. A better technique is to modify the default constructor to call this constructor by inserting a colon `:` and the `this` keyword. We pass in a `0` since the constructor we are calling requires an ID parameter. This technique is called `constructor chaining`.
- Use it any time one constructor needs to call another. In this case, the default constructor calls the parameterized constructor, providing a default customerId value of 0. Now the `Addresses` is always initialized regardless of how the customer object is constructed.
- So we've just seen an example of composition. In composition style relationships, an object from one class is constructed of objects from other classes.
- In this case, the construction of the `Customer` object constructs a list of addresses objects. At this point, we have an initialized empty list of addresses, but we don't currently have an address repository, so we have no way to populate the `Addresses`.

##### Populating referenced objects

We walk through how to populate our referenced object, specifically the `Addresses`. The `Customer` class now establishes the compositional relationship by constructing a set of addresses when the customer object is constructed, but that's not enough.

`❓When populating a customer object, where would the data for these addresses come from`

If the `Address` class was only used by the `Customer` class, the `CustomerRepository` could take the responsibility of retrieving and saving the address. But since the `Address` class is used by several classes, we'll build a separate `AddressRepository` and use it to retrieve the addresses for our customer.

```csharp {9-32, 34-42}
// AddressRepository
using System.Collection.Generics;
using ACM.BL;

namespace ACM.DL
{
    public class AddressRespositry
    {
        ///<summary>
        /// retrives address data by id
        ///</summary>
        ///<returns><returns>
        public Address Retrieve(int addressId)
        {
            // create instance of Order class
            // Pass requested Id
            var address = new Address(addressId);

            // hard-coded to retrieve defined customer
            if(addressId == 0)
            {
                address.AddressType = 1;
                address.StreetLine1 = "Bag end";
                address.StreetLine2 = "Bagshot";
                address.City = "Hobbiton";
                address.State = "Shire";
                address.Country = "Middle Earth";
                address.PostalCode = "144";
            }

            return address;
        }

        ///<summary>
        /// persist address data
        ///</summary>
        ///<returns><returns>
        public bool Save()
        {
            // code that persist address to data store
            return true;
        }
    }
}
```

- I've already created the Address Repository class and added the basic code. As with all of the other repository classes, the Address Repository class has Retrieve and Save methods.
- The `Retrieve` method creates a new instance of the Address class and populates it from data retrieved from the data store. We hard coded an address so we can use it for testing purposes.
- The `Save` method takes an address object in as a parameter, then returns true to denote that the save operation was successful. The code in between depends on your selected data access strategy.

Looking again at this Retrieve method, it retrieves a single address. When retrieving the customer's addresses, it would be better to retrieve all of the customer's addresses at one time, so let's add another method to the address repository. The method is public, so other parts of the application can retrieve addresses. Since there could be multiple addresses for a specified customer, the method returns an IEnumerable of Address.

```csharp{45-83}
// AddressRepository
using System;
using System.Collection.Generics;
using ACM.BL;

namespace ACM.DL
{
    public class AddressRespositry
    {
        ///<summary>
        /// retrives address data by id
        ///</summary>
        ///<returns><returns>
        public Address Retrieve(int addressId)
        {
            // create instance of Order class
            // Pass requested Id
            var address = new Address(addressId);

            // hard-coded to retrieve defined customer
            if(addressId == 0)
            {
                address.AddressType = 1;
                address.StreetLine1 = "Bag end";
                address.StreetLine2 = "Bagshot";
                address.City = "Hobbiton";
                address.State = "Shire";
                address.Country = "Middle Earth";
                address.PostalCode = "144";
            }

            return address;
        }

        ///<summary>
        /// persist address data
        ///</summary>
        ///<returns><returns>
        public bool Save()
        {
            // code that persist address to data store
            return true;
        }

        ///<summary>
        /// retrives addresses data by customerId
        ///</summary>
        ///<returns><returns>
        public IEnumerable<Address> RetrieveByCustomerId(int customerId)
        {
            // create instance of Order class
            // Pass requested Id
            var addresses = new List<Address>();
            // hard-coded to retrieve defined customer
            if(customerId == 0)
            {
                var address1 = new Address(1)
                {
                    AddressType = 1;
                    StreetLine1 = "Bag end";
                    StreetLine2 = "Bagshot";
                    City = "Hobbiton";
                    State = "Shire";
                    Country = "Middle Earth";
                    PostalCode = "144";
                };
                addresses.Add(address1);

                var address2 = new Address(2)
                {
                    AddressType = 2;
                    StreetLine1 = "Green Dragon";
                    StreetLine2 = "";
                    City = "ByWater";
                    State = "Shire";
                    Country = "Middle Earth";
                    PostalCode = "146";
                }
                addresses.Add(address2);
            }

            return addresses;
        }
    }
}
```

✏️: An `IEnumerable` is the recommended way to return a sequence of data because the results are more flexible for the callers of the method.

Since we want to populate the customer's addresses when we populate the other customer data, we modify the `CustomerRepository` to use the `AddressRepository`.

```csharp{2, 9-12, 14, 43}
using System.Collection.Generics;
using System.Linq;
using ACM.BL;

namespace ACM.DL
{
    public class CustomerRespositry
    {
        public CustomerRespositry()
        {
            _addressRepository = new AddressRespositry();
        }

        private readonly _addressRepository;


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
                customer.Addresses = _addressRepository.RetrieveByCustomerId(customerId).ToList();
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

Now when any code requests to retrieve a customer, this method will retrieve and populate the customer and its associated addresses. Let's test what we've done so far at testing section.

#### Composition : Ids

We've implemented the collaborative relationships between the repository and entity objects and defined the composition relationship between the customer and address by implementing a property in the Customer class for the list of addresses. Now when a customer is populated, the customer's list of addresses is also populated. This solution assumes that every time a customer is retrieved, that the addresses are needed as well.

![Relationsships](../../../../../../src/images/09_dotnet/c/oops/doop-19.png)

Let's implement the composition relationship between the order and the customer and the order and the address using a different technique.

- When populating the order object, the order doesn't care about the customer details such as home and work addresses. The order has its own address property.
- So instead of a property that is a reference to the customer, which would then load all of the customer details, let's instead establish the relationship between the order and the customer by adding a property for the customer ID. Same for the shipping address. We'll define a simple integer property for the address ID in the order.

![Advantages of using Ids](../../../../../../src/images/09_dotnet/c/oops/doop-20.png)

There are several advantages to using ID properties instead of object properties to establish a relationship between classes.

- It reduces coupling because the class no longer has a reference to its related class. In our example, the order class does not need to directly reference the customer or address classes.
- And it can be more efficient because loading an object does not load the data for its dependencies. In our example, the order repository does not need to load all of the customer information and the shipping address each time it loads the order.

Let's see what this looks like in the code. This is the Order class we created earlier in this course.

```csharp{19-20}
using System.Collection.Generics;

namespace ACM.BL
{
    public class Order
    {
        public Order():this(0)
        {
        }

        public Order(int orderId)
        {
            OrderId = orderId;
            OrderItems = new List<OrderItems>();
        }

        public int OrderId {get; set;}
        public DateTimeOffet? OrderDate {get; set;}
        public int CustomerId {get; set;}
        public int ShippingAddressId {get; set;}
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

- For the relationship between the order and the customer, we'll define an ID. I'll use a snippet, prop, Tab, Tab, int, Tab, CustomerId.
- And then for the relationship between the order and the address, prop, Tab, Tab, int, tab, ShippingAddressId. That's it. When the order repository populates the order, these ID properties are populated, but not the customer or address details.
- To finish off the properties for this class, let's define the composition relationship between the order and the order items using references by defining a list of order items; prop, Tab, Tab, ListOrderItem, Tab, OrderItems.
- Since the generic list is in the Systems.Collections .Generic library, use the quick action to add the using statement.
- And we'll modify the constructor to initialize the list as we did with the address list. Initialize the OrderItems in the constructor here. Then chain the constructor here.
  The order now has a customer as defined by this ID, has a shipping address as defined by this ID, and has a set of OrderItems as defined by this list.

![Relationship - overview](../../../../../../src/images/09_dotnet/c/oops/doop-21.png)

We have now looked at collaboration and composition relationships. What about inheritance?

## Inheritance `IS-A` relationship

![Requirements](../../../../../../src/images/09_dotnet/c/oops/doop-22.png)

We've ignored one of the statements in the original application requirements. The new system must manage business, residential, government, and educator types of customers. We don't currently have anything in our model to handle customer types. There are several ways we can handle these types. One option is to use inheritance.

![Inheritance IS-A](../../../../../../src/images/09_dotnet/c/oops/doop-23.png)

- Inheritance provides a mechanism for defining classes that are a more specialized version of another class. For example, we already have a Customer class.
  - We could create additional classes that define more specific types such as a business customer class, residential customer class, and so on.
  - The Customer class in this example is referred to as the parent or base class.
  - Each specialized class is called a child or derived class because it is a derived special case of the class above it in the hierarchy.
  - Each child class inherits, or takes on, the members of its parent class. In our example, the business customer class inherits all of the members of the Customer class, including the customer name, email address, and so on.
  - The specialized business customer class would only need to implement the additional features for the specific type.
- In this way, the specific classes leverage reuse in that they are using the properties and methods already defined in the parent class.
- Each class in a lower branch of the hierarchy has an is a relationship to the class above it in the hierarchy.
  - So a business customer is a customer and inherits all of the properties and behaviors defined for the customer
  - a residential customer is a customer, and so on.

![Inheritance in Customer](../../../../../../src/images/09_dotnet/c/oops/doop-24.png)

If the requirements warranted it, we could expand the hierarchy even further and define local government customers, and state government customers, and so on.

![Inheritance in C# ](../../../../../../src/images/09_dotnet/c/oops/doop-25.png)

- When implementing inheritance in C#, a class can only have one parent class.
- C# does not support multiple inheritance.
- There can be any number of inheritance levels. From customer, to educator, to high school, to teacher, and so on.

![Inheritance in Customer - 2](../../../../../../src/images/09_dotnet/c/oops/doop-26.png)

- Defining subtypes using an inheritance hierarchy can be helpful when first thinking about the classes and their relationships, but they are not always useful when defining the classes to implement.
- Only build an inheritance relationship between classes if the derived classes have specialized properties or behaviors that require unique code. And you can significantly leverage code reuse from the base class.

Let's think about these customers. Will there really be much difference in the code for business verses residential verses government verses educator customers? If not, the easiest way to define the subtypes is with a simple type property. We'll see how to use inheritance to reuse code in a later module.

```csharp{27}
// Customer.cs
using System.Collection.Generics;

namespace ACM.BL
{
    public class Customer
    {
        public Customer() : this(0) // CTOR chaining
        {
        }

        public Customer(int customerId)
        {
            CustomerId = customerId;
            Addresses = new List<Address>();
        }

        private string _lastName;

        ///	We could add two properties , each of type Address
        // public Address WorkAddress{get; set;}
        // public Address HomeAddress{get; set;}

        public List<Address> Addresses{get; set;}

        public int CustomerId {get; private set;}
        public int CustomerType {get; set;}
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

        // ...Methods
    }
}
```

For now, let's add a customer type property to the Customer class to handle the type of customer. Here in the Customer class, let's add a `CustomerType` property. That should do it. The class now has a property that represents the type of customer.
Let's finish this module with some checklists you can use as you define the relationships between the classes and your applications.

## Summary

![Collaboration : USES-A](../../../../../../src/images/09_dotnet/c/oops/doop-27.png)

A class has a collaboration or uses a relationship when the class uses another class that is otherwise unrelated. For example, the customer repository uses a customer instance to populate data. Implement this relationship by creating an instance of the collaborating class and accessing its properties or calling its methods.

![Collaboration : HAS-A](../../../../../../src/images/09_dotnet/c/oops/doop-28.png)

A class has a composition, or has a, relationship if the class is made up of, or composed, of parts from other classes. For example, an order isn't an order unless it has a customer, shipping address, and set of order items.

![Collaboration : HAS-A](../../../../../../src/images/09_dotnet/c/oops/doop-29.png)

There are two ways to implement a composition relationship.

1. Implement composition with a reference property if you want to retain and load the related object, or list of objects, as part of the main object. In this example, the order retains its set of order items.
2. Implement composition using an ID property instead if you want to retain the relationship, but don't always need all of the related object's data. In this example, the order has a CustomerId to establish the relationship between the order and the customer.

![Inheritance : IS-A](../../../../../../src/images/09_dotnet/c/oops/doop-30.png)

A class has an inheritance, or is a, relationship when defining classes that are a more specialized version of another class. For example, here we define more specialized versions of the Customer class. This relationship is useful when understanding the business requirements. But only implement this relationship if the specific class type adds unique code. In this example, the derived types did not add any unique code, so we implemented the CustomerType as a simple type property in the Customer class instead of inherited classes.

![4 pillars of OOP](../../../../../../src/images/09_dotnet/c/oops/doop-31.png)

Recall the first two pillars of object- oriented programming we discussed earlier in this course?

- `Abstraction` helps us map the business requirements to an initial set of classes.
- `Encapsulation` helps keep our properties and method code protected within the class and only accessible through a public programming interface.
- `Inheritance` is the third pillar of object- oriented programming. It helps us leverage reuse.

Speaking of reuse, now that our classes and their relationships are defined, let's take a focused look at reuse. We'll revisit inheritance and how we can use it and other object-oriented programming techniques to reuse code.
