---
title: 'Przewodnik po stylu Markdown'
description: 'Oto przykład podstawowej składni Markdown, która może być używana podczas pisania treści Markdown w Astro.'
pubDate: 'Jun 19 2024'
heroImage: '../../../assets/blog-placeholder-1.jpg'
---

Oto przykład podstawowej składni Markdown, która może być używana podczas pisania treści Markdown w Astro.

## Nagłówki

Następujące elementy HTML `<h1>`—`<h6>` reprezentują sześć poziomów nagłówków sekcji. `<h1>` to najwyższy poziom sekcji, a `<h6>` najniższy.

# H1

## H2

### H3

#### H4

##### H5

###### H6

## Akapit

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

## Obrazy

### Składnia

```markdown
![Tekst alternatywny](./pełna/lub/względna/ścieżka/do/obrazu)
```

### Wynik

![blog placeholder](../../../assets/blog-placeholder-about.jpg)

## Cytaty

Element blockquote reprezentuje treść cytowaną z innego źródła, opcjonalnie z przypisem, który musi znajdować się w elemencie `footer` lub `cite`, oraz opcjonalnie ze zmianami w linii, takimi jak adnotacje i skróty.

### Cytat bez atrybucji

#### Składnia

```markdown
> Tiam, ad mint andaepu dandae nostion secatur sequo quae.  
> **Uwaga** że możesz używać _składni Markdown_ wewnątrz cytatu.
```

#### Wynik

> Tiam, ad mint andaepu dandae nostion secatur sequo quae.  
> **Uwaga** że możesz używać _składni Markdown_ wewnątrz cytatu.

### Cytat z atrybucją

#### Składnia

```markdown
> Nie komunikuj się poprzez współdzielenie pamięci, współdziel pamięć poprzez komunikację.<br>
> — <cite>Rob Pike[^1]</cite>
```

#### Wynik

> Nie komunikuj się poprzez współdzielenie pamięci, współdziel pamięć poprzez komunikację.<br>
> — <cite>Rob Pike[^1]</cite>

[^1]: Powyższy cytat pochodzi z [wystąpienia](https://www.youtube.com/watch?v=PAAkCSZUG1c) Roba Pike'a podczas Gopherfest, 18 listopada 2015.

## Tabele

### Składnia

```markdown
| Kursywa   | Pogrubienie | Kod   |
| --------- | ----------- | ----- |
| _kursywa_ | **pogrubienie** | `kod` |
```

### Wynik

| Kursywa   | Pogrubienie | Kod   |
| --------- | ----------- | ----- |
| _kursywa_ | **pogrubienie** | `kod` |

## Bloki kodu

### Składnia

możemy używać 3 ukośników wstecznych ``` w nowej linii i napisać fragment kodu, a następnie zamknąć 3 ukośnikami wstecznymi w nowej linii. Aby podświetlić składnię specyficzną dla języka, napisz jedno słowo nazwy języka po pierwszych 3 ukośnikach wstecznych, np. html, javascript, css, markdown, typescript, txt, bash

````markdown
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Przykład dokumentu HTML5</title>
  </head>
  <body>
    <p>Test</p>
  </body>
</html>
```
````

### Wynik

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Przykład dokumentu HTML5</title>
  </head>
  <body>
    <p>Test</p>
  </body>
</html>
```

## Typy list

### Lista uporządkowana

#### Składnia

```markdown
1. Pierwszy element
2. Drugi element
3. Trzeci element
```

#### Wynik

1. Pierwszy element
2. Drugi element
3. Trzeci element

### Lista nieuporządkowana

#### Składnia

```markdown
- Element listy
- Inny element
- I jeszcze jeden element
```

#### Wynik

- Element listy
- Inny element
- I jeszcze jeden element

### Lista zagnieżdżona

#### Składnia

```markdown
- Owoce
  - Jabłko
  - Pomarańcza
  - Banan
- Nabiał
  - Mleko
  - Ser
```

#### Wynik

- Owoce
  - Jabłko
  - Pomarańcza
  - Banan
- Nabiał
  - Mleko
  - Ser

## Inne elementy — abbr, sub, sup, kbd, mark

### Składnia

```markdown
<abbr title="Graphics Interchange Format">GIF</abbr> to bitmapowy format obrazu.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Naciśnij <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Delete</kbd> aby zakończyć sesję.

Większość <mark>salamander</mark> prowadzi nocny tryb życia i poluje na owady, robaki i inne małe stworzenia.
```

### Wynik

<abbr title="Graphics Interchange Format">GIF</abbr> to bitmapowy format obrazu.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Naciśnij <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Delete</kbd> aby zakończyć sesję.

Większość <mark>salamander</mark> prowadzi nocny tryb życia i poluje na owady, robaki i inne małe stworzenia.
