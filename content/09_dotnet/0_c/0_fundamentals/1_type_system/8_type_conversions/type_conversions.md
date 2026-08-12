---
title: "Type Conversions"
slug: "09_dotnet/0_c/0_fundamentals/1_type_system/8_type_conversions"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Type Conversions - Changing Types</summary>
  <div>

## Type Conversions, Casting, and Boxing

**Real-life analogy**: Type conversions are like converting between different measurement units. Converting inches to centimeters is safe (implicit conversion) because no information is lost. Converting centimeters to inches might lose precision (explicit conversion) because you might need to round. Converting a description to a number requires parsing and might fail. Type conversions provide the same model - implicit conversions when safe, explicit conversions when data might be lost, and parsing when converting from text.

**Technical explanation**: Conversion is process of changing value from one type to another. Cast is explicit syntax for conversion, written with parentheses like (int)value. Implicit conversion happens automatically when compiler can guarantee safety. Explicit cast required when conversion might lose information or fail. Match conversion style to situation: implicit for safe conversions, explicit cast for potential data loss, pattern matching or as for safe reference-type conversion, parsing APIs for text source. Implicit conversion always succeeds, explicit might fail or lose information.

**Key jargon explained**:
- **Conversion**: Process of changing value from one type to another
- **Cast**: Explicit conversion syntax (Type)value
- **Implicit Conversion**: Automatic, compiler guarantees safety
- **Explicit Cast**: Manual indication, potential data loss
- **Boxing/Unboxing**: Value type to/from object

```csharp:title=NumericConversions.cs
int itemCount = 42;
long widened = itemCount; // Implicit conversion.

double average = 19.75;
int truncated = (int)average; // Explicit cast.

Console.WriteLine($"widened: {widened}, truncated: {truncated}");
```

```csharp:title=BoxingUnboxing.cs
int temperature = 72;
object boxedTemperature = temperature; // Boxing.
int unboxedTemperature = (int)boxedTemperature; // Unboxing.
```

**How it works in practice**: Implicit conversions happen automatically when compiler guarantees safety (int to long). Explicit casts required when data might be lost (double to int). Reference conversions: derived to base class always safe (implicit), base to derived requires explicit check (pattern matching or as). Boxing converts value type to object or interface, unboxing extracts value type. Avoid unnecessary boxing in hot paths (adds allocations). Parse text with TryParse for user input, Parse for guaranteed valid input.

**Key takeaways for interviews**:
- Implicit conversions automatic when safe
- Explicit casts when data might be lost
- Reference conversions: derived to base (implicit), base to derived (explicit)
- Boxing/unboxing: value type to/from object
- Use TryParse for user input, Parse for valid input

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Boxing and Unboxing - Value to Reference</summary>
  <div>

## Understand Boxing and Unboxing

**Real-life analogy**: Boxing is like placing a small item in a shipping container. The item (value type) is placed in a container (object reference) for transport. Unboxing is like removing the item from the container to use it directly. Boxing and unboxing provide the same mechanism for value types - converting a value type to object or interface type (boxing) and extracting the value type back (unboxing). This enables value types to be treated as reference types when needed.

**Technical explanation**: Boxing converts struct or other value type to object or implemented interface type. Unboxing extracts value type from that object reference. Boxing allocates memory on managed heap, unboxing requires type check. In hot paths, avoid unnecessary boxing because it adds allocations and extra work. Value types stored directly on stack or inline in containing types. Boxing creates object on heap containing copy of value type. Unboxing verifies type and copies value back to stack or inline location.

**Key jargon explained**:
- **Boxing**: Value type to object or interface
- **Unboxing**: Object or interface to value type
- **Managed Heap**: Memory area for boxed objects
- **Type Check**: Verification during unboxing
- **Performance**: Boxing adds allocations

```csharp:title=BoxingUnboxing.cs
int temperature = 72;
object boxedTemperature = temperature; // Boxing.
int unboxedTemperature = (int)boxedTemperature; // Unboxing.

Packet packet = new(7);
ILabelled labelledPacket = packet; // Boxing through an interface reference.

Console.WriteLine($"Unboxed: {unboxedTemperature}, Label: {labelledPacket.Label}");
```

**How it works in practice**: Boxing converts value type to object or interface. Allocates memory on managed heap, copies value type data. Unboxing extracts value type from object reference. Requires type check to ensure correct type. Unboxing copies value back to stack or inline location. Avoid unnecessary boxing in hot paths (performance cost). Boxing enables value types to be used where reference types expected (collections, interfaces).

**Key takeaways for interviews**:
- Boxing: value type to object or interface
- Unboxing: object or interface to value type
- Boxing allocates memory on managed heap
- Unboxing requires type check
- Avoid unnecessary boxing in hot paths

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Common Interview Questions</summary>
  <div>

## Interview Preparation

**Real-life analogy**: Interview preparation for type conversion concepts is like understanding measurement unit conversions. You need to understand when conversions are safe, when they lose information, and how to handle text parsing.

**Common interview questions**:
1. **What is the difference between implicit and explicit conversions?**
   - Implicit: automatic, compiler guarantees safety
   - Explicit: cast syntax, potential data loss or failure
   - Implicit: int to long (widening)
   - Explicit: long to int (narrowing, potential overflow)
   - Explicit: double to int (truncation)

2. **What are reference type conversions?**
   - Derived to base class: always safe (implicit)
   - Reference type to implemented interface: always safe (implicit)
   - Any reference type to object: always safe (implicit)
   - Base to derived: requires explicit check (pattern matching or as)
   - Use pattern matching for safe conversion

3. **What is boxing and unboxing?**
   - Boxing: value type to object or interface
   - Unboxing: object or interface to value type
   - Boxing allocates memory on managed heap
   - Unboxing requires type check
   - Avoid unnecessary boxing in hot paths

4. **When should you use Parse vs TryParse?**
   - Parse: when input guaranteed to be valid
   - TryParse: for user input, network payloads, file data
   - TryParse returns false instead of throwing exception
   - Use TryParse for expected invalid input
   - Parse for controlled test data

5. **What is the as operator used for?**
   - Safe reference-type conversion that might not succeed
   - Returns null when conversion fails
   - Use only with reference types and nullable value types
   - Alternative to pattern matching for nullable result
   - Prefer pattern matching for better readability

**Key interview concepts**:
- **Implicit Conversion**: Automatic, safe
- **Explicit Cast**: Manual, potential data loss
- **Reference Conversions**: Derived to base (implicit), base to derived (explicit)
- **Boxing/Unboxing**: Value type to/from object
- **Parse/TryParse**: Text to type conversion

**How to approach interview questions**:
- Start with implicit vs explicit conversion distinction
- Explain reference type conversions and safety
- Discuss boxing/unboxing and performance implications
- Address Parse vs TryParse for text conversion
- Mention as operator for safe reference conversion

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Type conversions, casting, and boxing - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/conversions)