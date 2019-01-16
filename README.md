# Angular Optimization with Pipe Function 
### Angular pipe for memoize function execution in the template


This small pipe will improve the performance in the Angular application.
Due to [memoization](https://en.wikipedia.org/wiki/Memoization) and reduced number of computations with [pure pipes](https://angular.io/guide/pipes#pure-pipes), You will gain more optimization in Your applications.

## Table of Contents
* [Installation](#installation)
* [Setup](#setup)
* [Usage](#usage)

## Installation

`npm install ngx-pipe-function --save`

## Setup

Register the NgxPipeFunctionModule in your application NgModule imports.

```ts
import { NgxPipeFunctionModule } from 'ngx-pipe-function';

@NgModule({
  imports: [NgxPipeFunctionModule],
})
export class AppModule {}
```

### Usage

> Angular executes a pure pipe only when it detects a pure change to the input value. A pure change is either a change to a primitive input value (String, Number, Boolean, Symbol) or a changed object reference (Date, Array, Function, Object).

#####Syntax
`{{ argument | pipeFunction : method [: context] }}`

#####Examples
Just provide argument and executable method to the template with `pipeFunction` 

```angular2html
<div>
    <h3>{{ value | pipeFunction : double }}</h3>
</div>
```
```ts
export class Component {
  public value = 100;

  public double(value: number): number {
    return value * 2;
  }
```

You could provide multiple arguments for the function like that:
```angular2html
<div>
    <h3>{{ [name, surname] | pipeFunction : compile }}</h3>
</div>
```
```ts
export class Component {
  public name = 'Bob';
  public surname = 'Dylan';

  public compile([name, surname]: string[]): string {
    return btoa(`${name} ${surname}`);
  }
```

##### Function with context

We still could have optimization in impure functions with Angular pipes.
Just provide context as second parameter to the `pipeFunction` pipe.

```angular2html
<h3>{{ value | pipeFunction : output : this }}</h3>
```

Alternative variant use `bind`

```angular2html
<h3>{{ value | pipeFunction : output.bind(this) }}</h3>
```

```ts
export class Component {
  public value = 'My name is';
  public name = 'Dylan';

  public output(value: string): string {
    return `${value} ${this.name}`;
  }
```


*Note: Also You colud take a look into `__tests__` directory for more examples of usage.*
