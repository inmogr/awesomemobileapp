import React from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import SingleLineTextInput from './src/components/SingleLineTextInput';
import RadioGroupInput from "./src/components/RadioGroupInput";
import CheckBoxGroupInput from "./src/components/CheckBoxGroupInput";

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <SingleLineTextInput
          label="Test"
          value="Test"
          handleChange={() => {}}
        />

        {/*  */}

        <SingleLineTextInput
          label="Test"
          value="Test"
          handleChange={() => {}}
          errorMessage="test"
        />

        {/*  */}

        <RadioGroupInput
          label="Test"
          value="Test"
          handleChange={() => {}}
          items={["Option 1", "Option 2"]}
        />

        {/*  */}

        <RadioGroupInput
          label="Test"
          value="Test"
          handleChange={() => {}}
          errorMessage="test"
          items={["Option 1", "Option 2"]}
        />

        {/*  */}

        <CheckBoxGroupInput
          label="Test"
          values={["Test"]}
          handleChange={() => {}}
          items={["Option 1", "Option 2"]}
        />

        {/*  */}

        <CheckBoxGroupInput
          label="Test"
          values={["Test"]}
          handleChange={() => {}}
          errorMessage="test"
          items={["Option 1", "Option 2"]}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
