import React from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {InputSection} from './src/containers/InputSection';
import FormData from './src/constants/FormData.json';
import {FormType} from './src/types/FormTypes';

function App(): React.JSX.Element {
  const form: FormType = FormData;
  const formSectionNames = Object.keys(form);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ paddingHorizontal: 16 }}>
        {formSectionNames.map(formSectionName => {
          const formSection = form[formSectionName];
          return (
            <InputSection
              key={formSectionName}
              fieldNames={Object.keys(formSection.properties)}
              properties={formSection.properties}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
