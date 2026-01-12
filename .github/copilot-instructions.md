# GitHub Copilot Instructions

## General Coding Guidelines

1.  代码中的注释 (comments) 必须全部使用英文。 (Code comments must be entirely in English.)
2.  代码中的文本内容 (例如变量名、字符串字面量等) 也必须使用英文。 (Code text content, such as variable names and string literals, must also be in English.)

## Documentation Guidelines

1. 避免使用 emoji，特别是在标题开头
2. 优先使用有序列表和表格组织内容
3. 使用 fumadocs 原生组件
4. 文档必须精炼、易读，避免创建重复或无用的文档。 (Documentation must be concise, easy to read, and avoid creating redundant or useless content.)

## File Management Guidelines

1.  所有临时文件、测试文件或脚本都应放置在 `tmp/` 目录下。 (All temporary files, test files, or scripts should be placed under the `tmp/` directory.)
2.  `tmp/` 目录必须被 `.gitignore` 忽略，确保不提交到版本控制。 (`tmp/` directory must be ignored by `.gitignore` to prevent commitment to version control.)
3.  `tmp/` 目录下的内容应定期清理。 (Contents of the `tmp/` directory should be regularly cleaned.)

## TypeScript Coding Standards

### Core Principles

- **Type Safety First**: 利用 TypeScript 类型系统在编译时捕获错误
- **Explicit Over Implicit**: 通过显式类型声明明确意图
- **Maintainability**: 代码应易于阅读、审查和重构
- **Consistency**: 统一的代码模式降低认知负担

### Type Rules

- [MUST] 禁止使用 `any`，使用 `unknown` 或具体类型
- [MUST] 启用严格空值检查 (`strictNullChecks`)
- [SHOULD] 优先使用类型推断，避免冗余类型注解
- [MUST] 禁止使用非空断言操作符 `!`
- [SHOULD] 导出函数必须显式声明返回类型

### Naming Conventions

- [MUST] 类、接口、类型使用 PascalCase
- [MUST] 变量、函数、属性使用 camelCase
- [SHOULD] 全局常量和枚举值使用 UPPER_CASE

### Code Patterns

- [SHOULD] 对象定义优先使用 `interface` 而非 `type`
- [SHOULD] 使用可选链 `?.` 替代空值检查
- [MUST] 使用 ES 模块，避免使用 `namespace`
- [MUST] 语句必须以分号结尾
- [SHOULD] 仅使用字符串枚举，避免数字枚举

### Async/Promise Handling

- [MUST] 所有 Promise 必须被 await，禁止浮动 Promise
- [SHOULD] 优先使用 `async/await` 而非原始 Promise

### Import Management

- [MUST] 禁止未使用的导入
- [SHOULD] 导入按字母顺序分组排列

### Documentation

- [SHOULD] 公共 API 必须包含 JSDoc 注释说明用途
- [SHOULD] 避免重复代码逻辑的行内注释

## Code Generation Instructions

When generating TypeScript code:

1. Always use strict type checking
2. Avoid `any` type - use `unknown` with type guards
3. Prefer interfaces for object shapes
4. Use explicit return types for exported functions
5. Apply optional chaining for safer property access
6. Ensure all async operations are properly awaited
7. Follow camelCase for variables, PascalCase for types
8. Add JSDoc comments for public APIs

## ESLint Configuration

Required rules:
- `@typescript-eslint/no-explicit-any`
- `@typescript-eslint/no-non-null-assertion`
- `@typescript-eslint/no-floating-promises`
- `@typescript-eslint/no-unused-vars`
- `@typescript-eslint/consistent-type-definitions`

## Resources

- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [@typescript-eslint Rules](https://typescript-eslint.io/rules/)
