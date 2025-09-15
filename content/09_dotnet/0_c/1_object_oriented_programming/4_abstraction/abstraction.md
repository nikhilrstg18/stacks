---
title: "Types Vs Objects"
slug: "09_dotnet/0_c/1_object_oriented_programming/4_abstraction"
stack: "C#.NET"
---

> Hiding implementation details and exposing simplified interface to user

![Abstraction is a concept](../../../../../src/images/09_dotnet/c/oops/abstraction-1.png)

- Abstraction in C# is a fundamental principle of OOP that simplifies complex systems by breaking them down into smaller, more manageable, exposing essential parts to user and hiding non-essential parts improving _usability_

- Abstraction in C# is the process of _defining the structure of an object without specifying its implementation details_. It allows developers to focus on the essential aspects of an object and hide the unnecessary complexities, promoting code reusability and making the system easier to understand and maintain.

There are 2 ways to achieve abstraction

1. abstract class / methods (achieves 0 to 100 % abstraction)
2. interface (achieves 100% abstraction)

## Abstract class

pre-requisite 👉 [abstract](./../../0_c/0_getting_started/1_modifiers#abstract) modifier

- An `abstract class` is a class that cannot be instantiated directly, and it may contain abstract methods that only declare their signature without providing an implementation.
- Abstract classes serve as a blueprint for derived classes, and they can also have concrete methods with defined behavior that can be shared across multiple derived classes.

### Example

To better comprehend what is abstraction in c#, let's consider a real-time example. Imagine we are developing a Media Player application. In this application, we want to handle different types of media files, such as audio and video. To implement abstraction, we can create an abstract class called MediaPlayer that defines the basic structure and functionality of a media player.

```csharp
using System;

// Abstract class defining the MediaPlayer structure
abstract class MediaPlayer
{
    // abstract method(s)
    public abstract void Play();
    public abstract void Pause();
    // concrete method(s)
    public void Stop()
    {
        Console.WriteLine("Stopped");
    };
}

```

In the above code snippet, we define an abstract class called `MediaPlayer` with three abstract methods: `Play()`, `Pause()`, and `Stop()`. These methods act as placeholders, and the actual implementation will be provided in the derived classes.

Next, we can create concrete classes that inherit from the `MediaPlayer` class to represent specific types of media players, such as AudioPlayer and VideoPlayer.

```csharp
// Concrete class for AudioPlayer
class AudioPlayer : MediaPlayer
{
    public override void Play()
    {
        Console.WriteLine("Playing audio...");
    }

    public override void Pause()
    {
        Console.WriteLine("Pausing audio...");
    }
}

// Concrete class for VideoPlayer
class VideoPlayer : MediaPlayer
{
    public override void Play()
    {
        Console.WriteLine("Playing video...");
    }

    public override void Pause()
    {
        Console.WriteLine("Pausing video...");
    }
}

class Program
{
    static void Main()
    {
        MediaPlayer player = new AudioPlayer();
        player.Play();
        player.Pause();
        player.Stop();

        player = new VideoPlayer();
        player.Play();
        player.Pause();
        player.Stop();
    }
}
//////
// Playing audio...
// Pausing audio...
// Stopped
// Playing video...
// Pausing video...
// Stopped
```

In the above code, we create two concrete classes, `AudioPlayer` and `VideoPlayer`, which inherit from the MediaPlayer abstract class. These classes must provide an implementation for the abstract methods declared in the base class.

## Interface

pre-requisite 👉 see [interface](../../0_c/0_getting_started/0_types/1_reference_types#interface)

### abstract class vs interface

| feature                                          | abstract class                                                                            | interface                                                                             |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Abstraction level                                | 0 to 100 % abstraction possible                                                           | only 100% abstaction possible                                                         |
| Constructor                                      | has CTORs, required when instance of class is created                                     | doesn't contain CTORs                                                                 |
| Multiple Inheritence                             | not supported                                                                             | supported                                                                             |
| Declare a member field                           | supported                                                                                 | not supported                                                                         |
| Access modifier                                  | all are allowed                                                                           | not allowed, by default all members are public                                        |
| Members with static, virtual, abstract or sealed | allowed                                                                                   | not allowed                                                                           |
| When to use                                      | more code with large functioning unit, intend to extend the class hierarchy in the future | low code with no functioning units, intend to create plug-and-play architecture in C# |
