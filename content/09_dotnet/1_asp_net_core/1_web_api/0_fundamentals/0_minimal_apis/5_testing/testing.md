---
title: "Testing"
slug: "09_dotnet/1_asp_net_core/1_web_api/0_fundamentals/0_minimal_apis/5_testing"
stack: "ASP.NET Core"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Testing Overview - Unit and Integration Tests</summary>
  <div>

## Test Minimal API Apps

**Real-life analogy**: Testing is like quality assurance in manufacturing. Unit tests inspect individual components in isolation (testing a gear in a workshop). Integration tests verify components work together (testing the entire assembly line). Both are essential - unit tests catch component-level issues quickly, integration tests catch system-level issues. Minimal API testing provides the same quality assurance - unit tests for isolated logic, integration tests for full request processing.

**Technical explanation**: Integration tests evaluate app components on a broader level than unit tests. Unit tests test isolated components with fakes/mocks. Integration tests use actual components (database, file system, network) and require more code and time. ASP.NET Core integration tests require a test project with SUT reference, test web host with TestServer, and test runner. Microsoft.AspNetCore.Mvc.Testing package handles dependency copying, content root setting, and WebApplicationFactory for streamlined bootstrapping.

**Key jargon explained**:
- **Unit Tests**: Isolated component testing with fakes/mocks
- **Integration Tests**: Component interaction testing with real infrastructure
- **SUT**: System Under Test - the app being tested
- **TestServer**: In-memory server for integration testing
- **WebApplicationFactory**: Streamlined SUT bootstrapping

```csharp:title=IntegrationTest.cs
// Integration test with WebApplicationFactory
public class TodoApiTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;

    public TodoApiTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task GetTodo_ReturnsSuccess()
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync("/todoitems/1");

        // Assert
        response.EnsureSuccessStatusCode();
    }
}
```

**How it works in practice**: Unit tests use mock databases and fakes for fast execution of isolated logic. Integration tests use WebApplicationFactory to create a test web host with TestServer, enabling full request-response pipeline testing. The test server processes requests in-memory without network overhead. Microsoft.AspNetCore.Mvc.Testing package simplifies test setup by handling dependency copying, content root configuration, and providing WebApplicationFactory for streamlined SUT bootstrapping.

**Key takeaways for interviews**:
- Unit tests: isolated components with fakes/mocks, fast execution
- Integration tests: real infrastructure, slower but comprehensive
- WebApplicationFactory for streamlined integration test setup
- TestServer enables in-memory request processing
- Separate unit and integration tests into different projects

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Unit Testing IResult Types</summary>
  <div>

## Unit Test IResult Implementation Types

**Real-life analogy**: Unit testing IResult types is like testing different delivery methods in isolation. Instead of testing the entire delivery system, you test each delivery method (standard delivery, express delivery, pickup) to ensure they work correctly. Unit testing IResult types provides the same focused testing - testing each result type (Ok, NotFound, BadRequest) in isolation without the full request pipeline overhead.

**Technical explanation**: Public IResult implementation types in Microsoft.AspNetCore.Http.HttpResults namespace enable unit testing of minimal route handlers using named methods instead of lambdas. This provides strong typing for test assertions. For example, testing that a handler returns NotFound<TValue> when an item doesn't exist, or Ok<TValue> when it does. The strong typing enables Assert.IsType<Results<Ok<Todo>, NotFound>>(result) to verify the exact result type returned.

**Key jargon explained**:
- **IResult Implementation Types**: Concrete result types (Ok<T>, NotFound<T>, etc.)
- **Strong Typing**: Compile-time type checking in tests
- **Named Methods**: Instead of lambdas for better testability
- **Assert.IsType**: Verifying exact result type
- **Mock Database**: In-memory database for testing

```csharp:title=UnitTestIResult.cs
[Fact]
public async Task GetTodoReturnsNotFoundIfNotExists()
{
    // Arrange
    await using var context = new MockDb().CreateDbContext();

    // Act
    var result = await TodoEndpointsV1.GetTodo(1, context);

    // Assert
    Assert.IsType<Results<Ok<Todo>, NotFound>>(result);

    var notFoundResult = (NotFound) result.Result;
    Assert.NotNull(notFoundResult);
}

[Fact]
public async Task GetTodoReturnsTodoFromDatabase()
{
    // Arrange
    await using var context = new MockDb().CreateDbContext();

    context.Todos.Add(new Todo { Id = 1, Title = "Test title" });
    await context.SaveChangesAsync();

    // Act
    var result = await TodoEndpointsV1.GetTodo(1, context);

    // Assert
    Assert.IsType<Results<Ok<Todo>, NotFound>>(result);

    var okResult = (Ok<Todo>) result.Result;
    Assert.NotNull(okResult);
}
```

**How it works in practice**: Using named methods instead of lambdas enables the compiler to infer the exact return type. This allows unit tests to assert on specific IResult implementation types like Ok<TValue> or NotFound<TValue>. The strong typing improves test reliability and provides better error messages. Mock databases (in-memory) replace external dependencies for isolated testing. This approach enables focused unit testing of handler logic without integration test overhead.

**Key takeaways for interviews**:
- IResult implementation types enable strong typing in tests
- Named methods instead of lambdas for better testability
- Assert.IsType verifies exact result type
- Mock databases replace external dependencies
- Unit tests faster than integration tests

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

**Real-life analogy**: Interview preparation for testing concepts is like understanding quality assurance methodologies. You need to understand different testing approaches, when to use each, how to set up test infrastructure, and how to ensure comprehensive coverage.

**Common interview questions**:
1. **What is the difference between unit tests and integration tests?**
   - Unit tests: isolated components with fakes/mocks
   - Integration tests: real infrastructure components
   - Unit tests faster, integration tests slower
   - Unit tests for logic, integration tests for infrastructure
   - Separate into different projects

2. **How do you set up integration tests in Minimal APIs?**
   - Test project with reference to SUT
   - WebApplicationFactory for test web host
   - TestServer for in-memory request processing
   - Microsoft.AspNetCore.Mvc.Testing package
   - Arrange, Act, Assert pattern

3. **What does WebApplicationFactory provide?**
   - Streamlined bootstrapping of SUT with TestServer
   - Copies dependencies from SUT to test project
   - Sets content root to SUT project root
   - Handles test server configuration
   - Simplifies integration test setup

4. **How do you unit test IResult implementation types?**
   - Use named methods instead of lambdas
   - IResult implementation types in HttpResults namespace
   - Assert.IsType to verify exact result type
   - Mock databases for dependency isolation
   - Strong typing improves test reliability

5. **When should you use unit tests vs integration tests?**
   - Unit tests for isolated logic and method behavior
   - Integration tests for infrastructure and full pipeline
   - Prefer unit tests when behavior can be tested either way
   - Integration tests for critical infrastructure scenarios
   - Balance between coverage and test execution time

**Key interview concepts**:
- **Unit vs Integration**: Isolated vs infrastructure testing
- **WebApplicationFactory**: Streamlined integration test setup
- **TestServer**: In-memory request processing
- **IResult Types**: Strong typing for result testing
- **Mock Dependencies**: Fakes for isolated testing

**How to approach interview questions**:
- Start with clear distinction between unit and integration tests
- Explain WebApplicationFactory benefits for integration testing
- Discuss IResult implementation types for strong typing
- Address when to use each testing approach
- Mention test project organization and best practices

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Test Minimal API apps | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/minimal-apis/test-min-api?view=aspnetcore-10.0)