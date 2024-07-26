import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Platform,
  StatusBar as AndriodStatus
} from "react-native";
import { Link, router, Stack } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Directions,
  Gesture,
  GestureDetector
} from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft
} from "react-native-reanimated";

const onboardingSteps = [
  {
    icon: "snowflake",
    title: "Welcome #DEVember",
    description: "Daily React Native tutorials during December"
  },
  {
    icon: "people-arrows",
    title: "Learn and grow together",
    description: "Learn by building 24 projects with React Native and Expo"
  },
  {
    icon: "book-reader",
    title: "Eduction for Children",
    description:
      "Contribution to the fundraiser 'Education for Children' to help Save the Children to provide eduction forevery child"
  }
];
const OnboardingScreen = () => {
  const [screenIndex, setScreenIndex] = useState(0);
  const data = onboardingSteps[screenIndex];

  const onContinue = () => {
    const isLastIndex = screenIndex === onboardingSteps.length - 1;
    if (isLastIndex) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex + 1);
    }
  };

  const onBack = () => {
    const isFirstScreen = screenIndex === 0;
    if (isFirstScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex - 1);
    }
  };

  const endOnboarding = () => {
    setScreenIndex(0);
    router.back();
  };
  const swipeForward = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(onContinue);
  const swipeBackword = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(onBack);

  const swipes = Gesture.Simultaneous(swipeBackword, swipeForward);
  return (
    <SafeAreaView style={styles.page}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />
      <View style={styles.stepIndicatorContainer}>
        {onboardingSteps.map((_,index) => (
          <View 
            key={index}
            style={[
              styles.stepIndicator,
              { backgroundColor: index === screenIndex ? "#CEF202" : "gray" }
            ]}
          />
        ))}
      </View>
      <GestureDetector gesture={swipes}>
        <View style={styles.pageContent} key={screenIndex}>
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <FontAwesome5
              style={styles.image}
              name={data.icon}
              size={150}
              color="#CEF202"
            />
          </Animated.View>
          <View style={styles.footer}>
            <Animated.Text
              entering={SlideInRight}
              exiting={SlideOutLeft}
              style={styles.title}
            >
              {data.title}
            </Animated.Text>
            <Animated.Text
              entering={SlideInRight.delay(200)}
              exiting={SlideOutLeft}
              style={styles.description}
            >
              {data.description}
            </Animated.Text>
            <View style={styles.buttonRow}>
              <Text style={styles.buttonText} onPress={endOnboarding}>
                Skip
              </Text>
              <Pressable style={styles.button} onPress={onContinue}>
                <Text style={styles.buttonText}>Continue</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </GestureDetector>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#15141A",
    paddingTop: Platform.OS === "ios" ? 0 : AndriodStatus.currentHeight
  },
  pageContent: {
    padding: 20,
    flex: 1
  },
  image: {
    alignSelf: "center",
    margin: 20,
    marginTop: 70
  },
  title: {
    color: "#FDFDFD",
    fontSize: 50,
    fontFamily: "Inter",
    letterSpacing: 1.3,
    marginVertical: 10
  },
  description: {
    color: "gray",
    fontSize: 20,
    fontFamily: "InterRegular",
    lineHeight: 28
  },
  footer: {
    marginTop: "auto"
  },
  buttonRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20
  },
  button: {
    flex: 1,
    backgroundColor: "#302E38",
    borderRadius: 50,
    alignItems: "center"
  },
  buttonText: {
    color: "#FDFDFD",
    fontFamily: "InterSemi",
    fontSize: 16,
    padding: 15,
    paddingHorizontal: 25
  },
  stepIndicatorContainer: {
    flexDirection: "row",
    gap: 8,
    marginHorizontal: 15
  },
  stepIndicator: {
    flex: 1,
    height: 3,
    backgroundColor: "gray",
    borderRadius: 10
  }
});
