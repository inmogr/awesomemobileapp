import React from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {InputSection} from './src/containers/InputSection';
import FormData from './src/constants/FormData.json';
import {FormType} from './src/types/FormTypes';

function App(): React.JSX.Element {
  const formData: FormType = FormData;
  const formDataSectionNames = Object.keys(formData);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{paddingHorizontal: 16}}>
        {formDataSectionNames.map(formSectionName => {
          const formSection = formData[formSectionName];
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
