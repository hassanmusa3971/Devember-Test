import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import MarkDownDisplay from "@/components/day3/MarkDownDisplay";
import { useState } from "react";

const template = `# Markdown editor
Hello **World**
`;
const EditorScreen = () => {
  const [content, setContent] = useState(template);
  const [tab, setTab] = useState("edit");
  return (
    <View style={styles.page}>
      <View style={styles.tabsContainer}>
        <Pressable onPress={() => setTab('edit')} style={[styles.tab,{backgroundColor: tab === 'edit' ? 'steelblue' : "white"}]}>
          <Text style={styles.textTab}>Edit</Text>
        </Pressable>
        <Pressable onPress={() => setTab('preview')} style={[styles.tab,{backgroundColor: tab === 'preview' ? 'steelblue' : "white"}]}>
          <Text style={styles.textTab}>Preview</Text>
        </Pressable>
      </View>
      {tab === "edit" ? (
        <TextInput
          value={content}
          onChangeText={setContent}
          multiline
          style={styles.input}
        />
      ) : (
        <MarkDownDisplay>{content}</MarkDownDisplay>
      )}
    </View>
  );
};

export default EditorScreen;
const styles = StyleSheet.create({
  page: {
    backgroundColor: "whitesmoke",
    flex: 1,
    padding: 10
  },
  input: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 10,
    fontSize: 16
  },
  tabsContainer: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10
  },
  tab: {
    flex: 1,
    padding: 10,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center"
  },
  textTab: {
    fontFamily: "InterBold"
  }
});
