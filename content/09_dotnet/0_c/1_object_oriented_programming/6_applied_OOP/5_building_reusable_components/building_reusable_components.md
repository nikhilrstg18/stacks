---
title: "Building Reusable Components"
slug: "09_dotnet/0_c/1_object_oriented_programming/6_applied_OOP/5_building_reusable_components"
stack: "C#.NET"
---

As we build our applications, we often find ourselves writing general purpose code that is not specifically business logic, code like string handling or logging. This module continues the discussion on leveraging reuse by building a reusable component

- C# applications are developed by building one or more components and using object- oriented programming techniques to define and build the classes within each component.
- Each component is created within Visual Studio by adding a new, separate project. for eg. here are four components.

![Components](../../../../../../src/images/09_dotnet/c/oops/foop-1.png)

- Two components in the _user-interface_ layer, one for the desktop application using WPF, and one for a web front end. There could be more user interface components for other technologies.
- The _business_ layer has one component, which we have been building. We are only showing three of the classes within this component to keep the diagram manageable. But this layer can include many more classes and additional components.
- There is also a component in the _data-access_ layer that handles calls to the database through ADO.NET, Entity Framework, or some other data access technology. The repository classes call this component to access the database.

So far, we created one project; ACM.BL, so we have one component. And we created a project for the unit test that is not shown in this diagram. Each component can be separately compiled and deployed.

❓**Are these components reusable**

In this diagram, the business layer component is reused by the WPF and web user interface components. Both use the logic included in the business logic layer.
And if we build generalized data access code, we may be able to reuse the data access layer component over multiple projects.

![Reusable Library Component](../../../../../../src/images/09_dotnet/c/oops/foop-2.png)

As we develop these components, we may find ourselves writing general purpose code that does not belong to any layer such as code to perform string operations, code to perform logging, code to email notifications or receipts, and so on.

Let's build a new component to define a reusable library of general purpose classes. The result can be used in any application.

![Outline](../../../../../../src/images/09_dotnet/c/oops/foop-3.png)

- We **build a reusable component** and build a unit test to test that component.
- We then walk through how to use that component from our business logic component.
- **Static classes** are often used in these types of reusable components, so we look at what static classes are and when and why you would use one.
- We examine how to add reusable methods to existing classes, including .NET classes using **extension methods**.

Let's get started.

## Scenario

![Scenario](../../../../../../src/images/09_dotnet/c/oops/foop-4.png)

We again meet with the subject matter experts and they bring an issue to our attention. Much of the product data for our ACM application is coming from another system. That third-party system is storing product names without spaces. When our application retrieves that data, instead of Sonic Screwdriver, two words, it is provided as SonicScrewdriver with no spaces. The customer is often confused by this when using our system.

❓**Can we reinsert the needed spaces before displaying the name**

The code can assume that a space should be inserted before each uppercase letter. We say no problem, and get to work.

We are back in Visual Studio with the Product class open. Since the product data store contains the product name without spaces, we want to add code to the product name getter to insert the appropriate spaces. The ProductName property is currently an auto-implemented property, so we can't add code to the getter or setter. Our first step then is to convert the auto- implemented property into a fully-defined property.

```csharp{6-8}
// Product.cs

    //..
    private string _productName;
    public string ProductName{
        get{
            return _productName;
        }
        set{
            _productNam = value;
        }
    }
    //..
```

Now we want to add code in the getter to insert spaces into the ProductName. Let's think about that a moment.

❓**Do we really want to write all that code here in the getter? Wouldn't it be better as a separate method**

That will make it easier to build and test. Let's write the method down here.

```csharp{17-20}
// Product.cs

    //..
    private string _productName;
    public string ProductName
    {
        get
        {
            return _productName;
        }
        set
        {
            _productNam = value;
        }
    }

    string InsertSpaces(string source)
    {

    }
```

❓**Does that method belong here**
❓**Should the Product class have responsibility for converting strings**
❓**And what if we want to use this method from other classes**

- When you find yourself creating general purpose methods such as this, consider putting them in a general purpose class.
- And if the resulting class is reusable throughout the current application and possibly other applications, consider creating a reusable library of general purpose classes.

## Building Reusable Component

We build the start of a general purpose library of reusable functionality. Most applications make some use of common functionality such as for logging or a specialized set of data handling, or like in our case, general purpose string handling

![Add class library project in VS](../../../../../../src/images/09_dotnet/c/oops/foop-5.png)

To build a new component, we start with a new project. Right-click on the Solution, and select Add, New Project. Select the desired language, then select Class Library ( .NET Framework) as the template. Give the project a general name.

✏️: Don't use the solution prefix such as **ACM** if this library may be used by other applications.

Since our fictitious company name is Acme, let's just call it `Acme.Common`

```csharp
//StringHandler.cs

namespace Acme.Common
{
    public class StringHandler
    {
        public string InsertSpaces(string source)
        {
            string result = string.Empty;
            if(!string.IsNullOrWhitespace(source))
            {
                foreach(char letter in source)
                {
                    if(char.IsUpper(letter))
                    {
                        result+=" ";
                    }
                    result+=letter;
                }
            }
            return result.Trim();
        }
    }
}

```

- The first class in our component will handle strings, so let's rename the Class1 file to StringHandler, Ensure the class is set to public so it can be accessed from outside the component.
- The method is public, so it can be used by any other component. It returns a string, and it takes in the string to process. The method initializes a result variable, which will be our return value. It skips processing of the source string if it's null or empty or other whitespace. If the source string contains something, it loops through each letter in the string looking for uppercase. If it finds an uppercase letter, it inserts a space and continues.
- Since code in this component could be reused throughout this application and other applications, unit testing is crucial. So our next step is to write the unit tests.

## Testing the Reusable Component

We write the unit tests for our reusable component.

![Acme.CommonTest](../../../../../../src/images/09_dotnet/c/oops/foop-6.png)

Because the code we are testing is in a new project, we'll create a new test project for it. Right-click on the Tests folder, and select Add, New Project. On the left, select the desired language and then Test. Then select the Unit Test Project from the list of templates. We'll name it Acme.CommonTest. And be sure to put it in our Tests folder.

![Adding Project Reference](../../../../../../src/images/09_dotnet/c/oops/foop-7.png)

Next, we'll set a reference to the Acme.Common component so that tests can access the component classes. Right-click on References, Add Reference, Select Projects Solution, and check Acme.Common

```csharp
//StringHandlerTests.cs
using xunit;

namespace Acme.CommonTest
{
    public class StringHandlerTests
    {
        public void Validate_InsertSpaces()
        {
            //Arrange
            var source = "ScrewDriver";
            var expected = "Screw Driver";
            var handler = new StringHandler();
            //Act
            var actual = handler.InsertSpaces(source);
            //Assert
            Assert.Equal(expected, actual);
        }
    }
}

```

✏️: Consider adding several more tests to cover other common scenarios such as null or empty strings, long strings, short strings, all uppercase strings, and so on.

At this point, let's assume we've written those tests, and they all pass. Then it's time to use this component.

## Using Reusable Component

> A reusable component is not very useful unless, of course, it's reused

![Adding Project Reference](../../../../../../src/images/09_dotnet/c/oops/foop-8.png)

First, we need to set a reference to the reusable component. In the ACM.BL project, right-click on the References node and select Add Reference. Ensure that Projects is selected on the left, and check Acme.Common on the right. Our ACM.BL project can now use any public class from the common component.

Looking at the `Product` class, we want to remove spaces from the ProductName, so we want to use our new reusable component from our Product class.

```csharp{7-11}
// Product.cs

    //..
    private string _productName;
    public string ProductName
    {
        get
        {
            var stringHandler = new StringHandler();
            return stringHandler.InsertSpaces(_productName);
        }
        set
        {
            _productNam = value;
        }
    }

```

- In the ProductName getter, create an instance of the `StringHandler` class. Use the quick action to add the appropriate using statement. We can then use that instance to call the `InsertSpaces` method, passing in our backing variable. We return the result.
- Now the `ProductName` provided by this class will always insert appropriate spaces in the name. And if the code must also store the name without spaces, we could add a remove spaces method to our common component and call it from the setter.

But let's step back for a moment, and look at this code.

❓**Why do we need to create an instance**
The `StringHandler` class does not maintain state. It has no properties.

❓**Wouldn't it be easier to use if we could just call this method without first creating the instance**
The good news is that we can. That's what static classes are for.

## Static class

![Normal class](../../../../../../src/images/09_dotnet/c/oops/foop-9.png)

- When creating a method in a normal class, define the method signature in the class, and implement the method body.
- We call the method by creating an instance of the class using the new keyword and using that instance to call the method, passing in any required parameters.

This is how we have the code now, but there is another way.

![Static class](../../../../../../src/images/09_dotnet/c/oops/foop-10.png)

> A static class is a class that cannot be instantiated. That means we can't create an instance of it using the `new` keyword.

- Because there is no instance, we access the members of a `static` class using the class name.
- The syntax is then more concise because we don't have to create the instance first.
- Properties and methods in a `static` class must also be declared `static`.
- A `static` class is often used as a container for utility methods that don't require instant state.

![Normal Vs Static class](../../../../../../src/images/09_dotnet/c/oops/foop-11.png)

Our `StringHandler` class is definitely designed to be a container for utility methods, so we can change it to be a `static` class by adding the `static` keyword. Its methods must also then be `static`. We call the method directly using the class name. No instance is required. Let's try out the `static` keyword.

![Making String Handler as Static class](../../../../../../src/images/09_dotnet/c/oops/foop-12.png)

We are looking at the StringHandler class. To make this class a static class, we add the static keyword to the class definition. As soon as we do, we see an error; can't declare instance members in a static class. This is telling us that the members must also be static.

![Resolving Error](../../../../../../src/images/09_dotnet/c/oops/foop-13.png)

We make the InsertSpaces method static by adding the static keyword to the method definition.

![Resolving Error-2](../../../../../../src/images/09_dotnet/c/oops/foop-14.png)

Looking at the error list, we now have even more errors. That's because the code currently uses the `new` keyword to create an instance of the class. Now that the class is static, we can no longer use the `new` keyword.

```csharp{7-10}
// Product.cs

    //..
    private string _productName;
    public string ProductName
    {
        get
        {
            return StringHandler.InsertSpaces(_productName);
        }
        set
        {
            _productNam = value;
        }
    }

```

Let's start with the Product class. We don't need to create the instance, we instead call the static method using the class name. The code in the getter is now simplified. Cool.

```csharp
//StringHandlerTests.cs
using xunit;

namespace Acme.CommonTest
{
    public class StringHandlerTests
    {
        public void Validate_InsertSpaces()
        {
            //Arrange
            var source = "ScrewDriver";
            var expected = "Screw Driver";
            //Act
            var actual = StringHandler.InsertSpaces(source);
            //Assert
            Assert.Equal(expected, actual);
        }
    }
}

```

We can't forget the unit tests, so let's fix them as well. Remove the code to create the instance here and here. Then call the method using the class name. Let's run all the tests to ensure all is well. And they all pass. Yay.

> Static classes are great, but use them sparingly. If you need instances, don't use the static keyword.

![Instances -> Not Static](../../../../../../src/images/09_dotnet/c/oops/foop-15.png)

- Classes in the business layer, for example, need to track data for each instance. Customer A has one set of data, customer B has a different set of data, so having an instance is required.

- Limit the use of static classes to general purpose support classes.

Now, do we want to take our utility methods a step further? Yes, yells the crowd. Let's extend the concept of static methods with extension methods.

## Extension Methods

![Extension Method](../../../../../../src/images/09_dotnet/c/oops/foop-16.png)

> An extension method allows us to add methods to any existing type without the source code of the type, without inheritance, without recompiling, without any changes at all to the original type.

- Since we aren't modifying the original type, extension methods are great for adding methods to .NET types such as `string`.
- Adding methods to a .NET type means that the type appears in IntelliSense with all the built-in methods for that type. From the perspective of the code using the method, it looks like the method is a member of the extended type.
- Only `static` methods in `static` classes can be extension methods.

![Extension Method- Inteliisense](../../../../../../src/images/09_dotnet/c/oops/foop-17.png)

❓**Wouldn't it be cool if our InsertSpaces method existed as a method on the .NET string class**
It would then appear in IntelliSense as just another string method like `IndexOf` or `Length`.

![Static Vs Extension Method](../../../../../../src/images/09_dotnet/c/oops/foop-18.png)

- To change our current static `InsertSpaces` method to an extension method, we simply add the `this` keyword before the first parameter. The method then becomes an extension method on the class defined in that first parameter.
- In this example, that type is string. Then, instead of calling the method using our class name, we call it using the string itself.
- In this example, we want to `InsertSpaces` into the `ProductName` string, so that's the string we call it with, just like calling other string methods such as trim. This syntax makes it so easy to read. Very cool.

```csharp{7}
//StringHandler.cs

namespace Acme.Common
{
    public static class StringHandler
    {
        public static string InsertSpaces(this string source)
        {
            string result = string.Empty;
            if(!string.IsNullOrWhitespace(source))
            {
                foreach(char letter in source)
                {
                    if(char.IsUpper(letter))
                    {
                        result+=" ";
                    }
                    result+=letter;
                }
            }
            return result.Trim();
        }
    }
}

```

Looking at our error list, notice that this does not break any of our existing code. The method can still be called like a static method, but now it can also be called as a method on the extended class. Let's change the Product class getter. We can now call the method directly on the string itself. Type \_productName.,

```csharp{7-10}
// Product.cs

    //..
    private string _productName;
    public string ProductName
    {
        get
        {
            return _productName.InsertSpaces();
        }
        set
        {
            _productNam = value;
        }
    }

```

- Another benefit of extension methods is discoverability. If another developer is looking for a way to insert spaces, when the developer types source., the extension methods appear in IntelliSense.
- No need to hunt around for or remember the name of the class in the component. This might help your reusable code get reused more often.

## Static VS Extension Methods

![Static Vs Extension Method](../../../../../../src/images/09_dotnet/c/oops/foop-19.png)

When creating reusable methods and reusable classes within a reusable component, when should we define a simple static method, and when should we instead define an extension method?

If the answer to these questions is yes, then consider defining an extension method. Otherwise, the static method will do.

To make this choice, consider the following questions; for examples, Let's consider these questions with our `InsertSpaces` method.

❓**Is the primary method parameter an instance**

Yes, it's an instance of a string.

❓**Does the method logically operate on that instance**

Yes, it inserts spaces into that string.

❓**Is it desirable for the method to appear in IntelliSense for that type**
Yes, InsertSpaces makes sense as a member of the string class and should appear in IntelliSense for any string.

Based on these criteria, it makes sense that we made our `InsertSpaces` method an extension method. When determining whether a static method should instead be an extension method, ask yourself these questions. Now let's finish off this module with some checklists we can use as we build reusable components.

## Summary

![Building Reuable Component](../../../../../../src/images/09_dotnet/c/oops/foop-20.png)

We walked through how to build a reusable component. Create a separate project for each reusable component. For example, you may want one reusable component for common UI functionality, one as a more general purpose library, and one specifically for accessing a data store. Build a library of general purpose methods in the component. Organize the method's logically into classes. A StringHandler class contains string methods. A logging service contains logging methods, and so on. Reuse the component in any application you build.

![Static Class](../../../../../../src/images/09_dotnet/c/oops/foop-21.png)

> When building reusable components, we often define `static` classes.

- A static class is a class that cannot be instantiated.
- A static class is sealed, meaning it can't be extended through inheritance.
- Define a static class using the `static` keyword.
- Use a static class to organize utility methods.

![Static Method](../../../../../../src/images/09_dotnet/c/oops/foop-22.png)

> Every method in a static class must be static.

- Define a method as static with a `static` keyword. Access a static member with the class name.
- Use static methods to create reusable utility methods.

![Extension Method](../../../../../../src/images/09_dotnet/c/oops/foop-23.png)

Sometimes, we may want to make our static method an extension method.

- An extension method adds a method to an existing type without modifying the original type. The method must be `static`.
- Define a method as an extension method by adding `this` to the first parameter. The type of that first parameter is then the type that is extended.
- In this example, we extend the `string` type. Access an extension method using the extended class instance. In this example, we extend string, so we use the string instance to access the method.

By building a reusable library of general purpose classes, you have a reusable component that you and your team can use for your current and future projects.

Now let's look at one more way to leverage reuse; defining interfaces.
