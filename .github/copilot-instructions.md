# GitHub Copilot Instructions

## General Coding Guidelines

1.  代码中的注释 (comments) 必须全部使用英文。 (Code comments must be entirely in English.)
2.  代码中的文本内容 (例如变量名、字符串字面量等) 也必须使用英文。 (Code text content, such as variable names and string literals, must also be in English.)

## Documentation Guidelines

1. 避免使用 emoji，特别是在标题开头
2. 优先使用有序列表和表格组织内容
3. 使用 fumadocs 原生组件
4. 文档必须精炼、易读，避免创建重复或无用的文档。 (Documentation must be concise, easy to read, and avoid creating redundant or useless content.)

### Blog-Specific Guidelines

1. 对于论文笔记博客，优先使用有序列表。 (For paper-note blog posts, prefer using ordered lists.)
2. 博客的第一段（前言）可以不用有序列表，使用段落文本形式。 (The first section (preamble) of a blog post can be in paragraph form without ordered lists.)
3. 句子长度（英文为主）：每个列表项尽量只表达一个观点；优先使用短句；避免长从句、堆叠形容词。 (Sentence length (mainly English): keep one idea per list item; prefer short sentences; avoid long clauses and adjective stacking.)
4. 句式约束：优先使用直接陈述（"X does Y" / "Given (x_t, t), ..."）；避免修辞性提问和夸张比喻；直觉解释最多 1-2 句，否则单独成小节。 (Sentence patterns: prefer direct statements; avoid rhetorical questions and heavy metaphors; keep intuition to 1-2 sentences or move it to a dedicated short section.)
5. 术语一致性（MUST）：同一概念全篇使用同一术语（例如 forward/reverse process、noise prediction、MSE、ELBO）；不要在同一篇里切换同义词。 (Terminology consistency (MUST): use one term per concept across the post; do not swap synonyms within the same post.)
6. 排版与符号（MUST）：避免使用花式引号（例如 “ ”），统一使用普通引号（" "); 当数学符号较多时，必须提供 Notation 表格集中解释。 (Formatting and notation (MUST): avoid curly quotes; use straight quotes; when there are many symbols, provide a Notation table.)

### Blog-Specific Guidelines

1. 对于论文笔记博客，优先使用有序列表。 (For paper-note blog posts, prefer using ordered lists.)
2. 博客的第一段（前言）可以不用有序列表，使用段落文本形式。 (The first section (preamble) of a blog post can be in paragraph form without ordered lists.)
3. 句子长度（英文为主）：每个列表项尽量只表达一个观点；优先使用短句；避免长从句、堆叠形容词。 (Sentence length (mainly English): keep one idea per list item; prefer short sentences; avoid long clauses and adjective stacking.)
4. 句式约束：优先使用直接陈述（"X does Y" / "Given (x_t, t), ..."）；避免修辞性提问和夸张比喻；直觉解释最多 1-2 句，否则单独成小节。 (Sentence patterns: prefer direct statements; avoid rhetorical questions and heavy metaphors; keep intuition to 1-2 sentences or move it to a dedicated short section.)
5. 术语一致性（MUST）：同一概念全篇使用同一术语（例如 forward/reverse process、noise prediction、MSE、ELBO）；不要在同一篇里切换同义词。 (Terminology consistency (MUST): use one term per concept across the post; do not swap synonyms within the same post.)
6. 排版与符号（MUST）：避免使用花式引号（例如 “ ”），统一使用普通引号（" "); 当数学符号较多时，必须提供 Notation 表格集中解释。 (Formatting and notation (MUST): avoid curly quotes; use straight quotes; when there are many symbols, provide a Notation table.)
### Writing Style Guidelines (Chinese Content)

以下是中文内容（特别是教程类文档）的语言风格要求：

1. **简洁直接 (Concise and Direct)**：
   - [MUST] 避免啰嗦和冗余表达，直接切入重点
   - [MUST] 避免过度客气的措辞（如"您可以考虑..."，改用"设置为..."）
   - [SHOULD] 用短句，避免复杂从句

2. **实用主义 (Pragmatic)**：
   - [MUST] 只包含经过验证的信息和参数，禁止猜测或未经测试的建议
   - [MUST] 提供具体的数值和操作步骤，避免模糊的范围（如"学习率 1e-4 到 1e-5" 改为具体值 "0.00005"）
   - [SHOULD] 标注参数来源（如"基于实际训练经验"）

3. **口语化与通俗易懂 (Colloquial and Accessible)**：
   - [SHOULD] 可以使用适度的网络用语和口语化表达（如"必勾"、"保持默认即可"）
   - [MUST] 技术术语保持准确，但避免过度学术化
   - [SHOULD] 用表格和要点组织复杂信息，提高可读性

4. **精确严谨 (Precise and Rigorous)**：
   - [MUST] 参数值必须精确（如 5e-5 写作 "0.00005"）
   - [MUST] 操作步骤必须与实际 UI 完全一致
   - [MUST] 避免"可能"、"大概"、"也许"等不确定表达

5. **避免冗余内容 (Avoid Redundancy)**：
   - [MUST] 不要添加用户未要求的额外章节（如 FAQ、进阶技巧等）
   - [MUST] 避免重复说明相同概念
   - [SHOULD] 每个要点只解释一次，后续引用时直接说明而不重复解释

6. **语气与态度 (Tone)**：
   - [SHOULD] 保持自信、直接的语气
   - [MUST] 避免过度谦虚或不确定的表达
   - [SHOULD] 对于关键参数用加粗和 Callout 组件强调，但不过度使用

7. **内容组织 (Content Organization)**：
   - [SHOULD] 优先使用表格展示参数配置
   - [SHOULD] 用标题清晰分隔不同部分
   - [MUST] 与实际操作界面的结构保持一致（如 UI 的 9 个参数面板）
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


