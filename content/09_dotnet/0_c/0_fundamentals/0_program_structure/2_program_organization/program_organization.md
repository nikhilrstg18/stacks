---
title: "Program Organization"
slug: "09_dotnet/0_c/0_fundamentals/0_program_structure/2_program_organization"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Program Organization - Hierarchical Structure</summary>
  <div>

## Program Organization

**Real-life analogy**: Program organization is like organizing a large corporation with multiple departments, offices, and teams. Solutions are like the corporate headquarters grouping related divisions. Projects are like individual departments producing specific outputs. Assemblies are like the products or services each department delivers. Namespaces are like teams within departments. Types are like individual employees with specific roles. This hierarchical structure keeps large organizations manageable and scalable. C# program organization follows the same hierarchy for maintainable codebases.

**Technical explanation**: Organize .NET applications in layers from broadest to most specific: Solution (container grouping related projects), Project (build unit producing one assembly), Assembly (compiled .dll or .exe), Namespace (logical grouping of types), Type (class, struct, interface, enum, delegate). Solutions organize development workflow. Projects define what compiles together, each produces one assembly. Assemblies are unit of deployment and versioning. Namespaces prevent naming collisions. Single assembly can contain multiple namespaces, single namespace can span multiple assemblies. Types define behavior and data.

**Key jargon explained**:
- **Solution**: Container grouping related projects
- **Project**: Build unit producing one assembly
- **Assembly**: Compiled .dll or .exe
- **Namespace**: Logical grouping of types
- **Type**: Class, struct, interface, enum, delegate

```csharp:title=Hierarchy.cs
// Solution: MyApp.slnx
// Project: MyApp.Web.csproj
// Assembly: MyApp.Web.dll
// Namespace: MyApp.Web.Controllers
// Type: OrderController

namespace MyApp.Web.Controllers;

public class OrderController
{
    public IActionResult GetOrder(int id)
    {
        return Ok(new Order { Id = id });
    }
}
```

**How it works in practice**: Solutions group related projects for development workflow. Projects define compilation units, each produces one assembly (class library or executable). Start with single project for small applications, don't split prematurely. Create separate projects when sharing code across applications or separating concerns. Assemblies are deployment and versioning units. Namespaces prevent naming collisions and make types easy to find. Namespace names should follow folder structure. Types define actual behavior and data.

**Key takeaways for interviews**:
- Hierarchy: Solution → Project → Assembly → Namespace → Type
- Solutions organize development workflow
- Projects produce assemblies (deployment units)
- Namespaces prevent naming collisions
- Start with single project, split when necessary

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Namespace Organization - Feature-Based Structure</summary>
  <div>

## Match Namespaces to Folder Structure

**Real-life analogy**: Matching namespaces to folder structure is like organizing file cabinets by department and sub-department. When you need the "Finance-Accounting" file, you know to look in the Finance cabinet, Accounting drawer. This intuitive organization makes finding documents easy. Namespace names following folder structure provide the same benefit - when you see namespace MyApp.Services.Payments, you know to look in Services/Payments folder for the source code. This convention is widely followed in .NET community.

**Technical explanation**: Namespace names should follow folder structure of project. Root namespace automatically set to project file name. Types in subfolders don't automatically get sub-namespaces - declare namespace explicitly in each file. Keep them in sync. Use file-scoped namespaces (namespace MyApp.Services;) recommended style. Change root namespace with <RootNamespace> property in project file. Organize namespaces by feature or responsibility, not by type kind. Group interface, implementations, and supporting types together in same namespace for feature-based organization.

**Key jargon explained**:
- **Folder Structure**: Physical directory organization
- **Root Namespace**: Automatically set to project name
- **File-scoped Namespaces**: namespace MyApp; syntax
- **Feature-based Organization**: Group by feature, not type
- **RootNamespace Property**: Project file setting for root namespace

```csharp:title=FolderStructure.cs
// File: Services/OrderService.cs
using MyApp.Core;

namespace MyApp.Services;

public class OrderService
{
    public Order CreateOrder(string product, int quantity, decimal price) =>
        new() { ProductName = product, Quantity = quantity, UnitPrice = price };

    public string FormatSummary(Order order) =>
        $"{order.Quantity}x {order.ProductName} = {order.Total:C}";
}
```

```csharp:title=FeatureBased.cs
namespace MyApp.Payments;

public interface IPaymentProcessor
{
    bool ProcessPayment(decimal amount);
}

public class CreditCardProcessor : IPaymentProcessor
{
    public bool ProcessPayment(decimal amount)
    {
        Console.WriteLine($"Processing credit card payment of {amount:C}");
        return true;
    }
}

public record PaymentResult(bool Success, string? TransactionId);
```

**How it works in practice**: Namespace names mirror folder structure for intuitive navigation. Root namespace defaults to project name, changeable via <RootNamespace> property. File-scoped namespaces (namespace MyApp;) reduce indentation and are recommended. Organize namespaces by feature or responsibility, not by type kind - group interface, implementations, and supporting types together. Feature-based organization keeps everything needed in one place, making code easier to navigate and reason about. This convention is widely followed, violating it confuses other developers.

**Key takeaways for interviews**:
- Namespace names should follow folder structure
- Root namespace defaults to project name
- File-scoped namespaces recommended
- Organize by feature, not by type kind
- Feature-based organization improves navigation

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

**Real-life analogy**: Interview preparation for program organization concepts is like understanding organizational structures. You need to understand how to organize departments, how to structure teams, how to match physical locations to organizational units, and how to balance centralization with autonomy.

**Common interview questions**:
1. **What is the organizational hierarchy in .NET applications?**
   - Solution: container grouping related projects
   - Project: build unit producing one assembly
   - Assembly: compiled .dll or .exe (deployment unit)
   - Namespace: logical grouping of types
   - Type: class, struct, interface, enum, delegate

2. **When should you create separate projects?**
   - Share code across applications (extract to class library)
   - Separate concerns (data access, business logic, presentation layers)
   - Control dependencies (project can only use types it references)
   - Start with single project, don't split prematurely
   - Extract library when second application needs same code

3. **How should namespace names relate to folder structure?**
   - Namespace names should follow folder structure
   - When seeing MyApp.Services.Payments, look in Services/Payments folder
   - Root namespace automatically set to project name
   - Types in subfolders don't automatically get sub-namespaces
   - Declare namespace explicitly in each file, keep in sync

4. **How should you organize namespaces - by feature or by type?**
   - Organize by feature or responsibility, not by type kind
   - Group interface, implementations, and supporting types together
   - Feature-based organization keeps everything needed in one place
   - Makes code easier to navigate and reason about
   - Example: MyApp.Payments with IPaymentProcessor, CreditCardProcessor, PaymentResult

5. **What are the recommended practices for program organization?**
   - Name namespaces consistently (CompanyName.ProductName.Feature)
   - Keep projects focused with single, clear responsibility
   - Use file-scoped namespaces (namespace MyApp;)
   - Default to internal for types other projects don't need
   - Only mark types public when assemblies genuinely need them

**Key interview concepts**:
- **Organizational Hierarchy**: Solution → Project → Assembly → Namespace → Type
- **Project Separation**: When to split into multiple projects
- **Folder Structure**: Namespace names mirror folders
- **Feature-based Organization**: Group by feature, not type
- **Access Modifiers**: public vs internal for encapsulation

**How to approach interview questions**:
- Start with organizational hierarchy and purpose of each level
- Explain when to create separate projects (reuse, separation, dependencies)
- Discuss namespace-folder structure matching
- Address feature-based vs type-based organization
- Mention recommended practices (consistent naming, focused projects, file-scoped namespaces)

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Program organization - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/program-organization)