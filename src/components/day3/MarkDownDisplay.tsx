import { View, StyleSheet, ScrollView } from "react-native";
import React, { PropsWithChildren } from "react";
import Markdown from "react-native-markdown-display";

const copy = `
# Welcome to My Markdown Document

## Introduction

This is a sample markdown document. Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents. 

## Features

- **Bold text**: You can make text **bold** by wrapping it in double asterisks.
- *Italic text*: Italicize text by wrapping it in single asterisks or underscores.
To add image: ![Alt text](https://www.pexels.com/photo/beach-umbrellas-and-sunbeds-in-resort-on-sea-shore-24405903/)
- [Links](http://example.com): Create links by wrapping the link text in square brackets and the URL in parentheses.


## Lists

### Unordered List

- Item 1
- Item 2
  - Subitem 1
  - Subitem 2

### Ordered List

1. First item
2. Second item
   1. Subitem 1
   2. Subitem 2

## Code

### Inline Code

You can use 'inline code' by wrapping the text in single backticks.

### Code Blocks

Use triple backticks to create code blocks:
You can use 'inline code' by wrapping the text in single backticks.

### Code Blocks

Use triple backticks to create code blocks:
You can use 'inline code' by wrapping the text in single backticks.

### Code Blocks

Use triple backticks to create code blocks:
`;
const MarkDownDisplay = ({children}:PropsWithChildren) => {
  return (
    <ScrollView style={styles.page} contentInsetAdjustmentBehavior="automatic">
      <Markdown style={markdownStyles}>{children}</Markdown>
    </ScrollView>
  );
};

export default MarkDownDisplay;

const markdownStyles = StyleSheet.create({
      heading1:{
            fontFamily: 'Inter',
            color: '#404040',
            marginTop: 10,
            marginBottom: 5,
            lineHeight: 40,
      },
      heading2:{
            fontFamily:  'InterBold',
            color: '#404040',
            marginTop: 10,
            marginBottom: 5,
            lineHeight: 30,
      },
      body:{
        fontSize: 16,
        lineHeight: 24,
      }
})

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  }
});
