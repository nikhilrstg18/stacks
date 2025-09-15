---
title: "Encapsulation"
slug: "09_dotnet/0_c/1_object_oriented_programming/1_encapsulation"
stack: "C#.NET"
---


> Defined as the wrapping up of _data_ and _method_ operating on data under a single unit

![Encapsulation](../../../../../src/images/09_dotnet/c/oops/oop-encapsulation1.gif)

- `Encapsulation` is to keep the implementation details of a class hidden from the outside world, and to only expose a public interface that allows users to interact with the class in a controlled and safe manner.

- This helps to promote , modularity, maintainability, and flexibility in the design of software systems.

e.g. in C# encapsulation is commonly achieved via classes

```csharp
using System;
					
public class Car
{
    // data members
    string model;

    // methods
    public void Start(){
        Console.WriteLine($"{model} started");
    }

    public void Move(){
        Console.WriteLine($"{model} moving");
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        var car = new Car();
        car.model = "Audi"; ❌
        car.Start();
        car.Move();
    }
}

//// output
// Compilation error : 'Car.model' is inaccessible due to its protection level
// Compilation error : Field 'Car.model' is never assigned to, and will always have its default value null
```
We can solve this by decorating model field as `public`

```csharp
using System;
					
public class Car
{
    // data members
    public string model;

    // methods
    public void Start(){
        Console.WriteLine($"{model} started");
    }

    public void Move(){
        Console.WriteLine($"{model} moving");
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        var car = new Car();
        car.model = "Audi";
        car.Start();
        car.Move();
    }
}

//// output
// Audi started
// Audi moving
```

In real world, issue with above approach is field `model` is now can be accessed publically by other classes (can currupt data of Car instance). We need to secure the data of Car and implement a way to access data in a secure way as below

```csharp
using System;
					
public class Car
{
    // data members
	private string model; // private field

    public string Model  // public property
    {
        get => model;
        set => model = value;	
    }

    // methods
    public void Start(){
        Console.WriteLine($"{model} started");
    }

    public void Move(){
        Console.WriteLine($"{model} moving");
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        var car = new Car();
        // car.model = "Audi";
        car.Model = "Audi";
        car.Start();
        car.Move();
    }
}
//// output
// Audi started
// Audi moving
```

In C#, we can simplify above class using Property expression which internally create private field to store data and public getter and setter to access private data of its own class

```csharp
using System;
					
public class Car
{
    // data members
	public string Model {get;set;}

    // methods
    public void Start(){
        Console.WriteLine($"{Model} started");
    }

    public void Move(){
        Console.WriteLine($"{Model} moving");
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        var car = new Car();
        car.Model = "Audi";
        car.Start();
        car.Move();
    }
}
//// output
// Audi started
// Audi moving
```

>  Ecapsulation is wrapping up of _data_ and _method_ operating on data under a _single unit_ along with _data hiding_ to reinforce security (matching real-world object) 

![Encapsulation](../../../../../src/images/09_dotnet/c/oops/oop-encapsulation2.gif)

## Advantages of Encapsulation:

- **Data Hiding**:

The user will have no idea about the inner implementation of the class. It will not be visible to the user that how the class is stored values in the variables. He only knows that we are passing the values to accessors and variables are getting initialized to that value.

- **Increased Flexibility**:

We can make the variables of the class as read-only or write-only depending on our requirement. If we wish to make the variables as read-only then we have to only use Get Accessor in the code. If we wish to make the variables as write-only then we have to only use Set Accessor.

- **Reusability**:

Encapsulation also improves the re-usability and easy to change with new requirements.

- **Testing code is easy**:

Encapsulated code is easy to test for unit testing.

## Real life example

```csharp
public class BankAccount {
	private decimal balance;

	public BankAccount(decimal initialBalance)
	{
		balance = initialBalance;
	}

	public void Deposit(decimal amount)
	{
		balance += amount;
	}

	public void Withdraw(decimal amount)
	{
		if (balance >= amount) {
			balance -= amount;
		}
		else {
			Console.WriteLine("Insufficient funds.");
		}
	}

	public decimal GetBalance() { return balance; }
}

class Program {
	static void Main(string[] args)
	{
		BankAccount myAccount = new BankAccount(1000);

		myAccount.Deposit(500);
		Console.WriteLine("Balance: "
			+ myAccount.GetBalance());

		myAccount.Withdraw(2200);
		Console.WriteLine("Balance: "
			+ myAccount.GetBalance());
	}
}

// output :-
// Balance: 1500
// Insufficient funds.
// Balance: 1500
```

In this example, we have a class BankAccount that represents a simple bank account with a balance that can be deposited into and withdrawn from. The balance field is marked as private, which means that it cannot be accessed directly from outside the class. Instead, we provide public methods Deposit, Withdraw, and GetBalance that provide a controlled interface to the balance field.

In the Main method, we create an object myAccount of the BankAccount class with an initial balance of 1000. We then call the Deposit and Withdraw methods to modify the balance, and the GetBalance method to retrieve the current balance. Note that we cannot access the balance field directly, but must use the public methods provided by the class to interact with it.

