import React from 'react';
import {DataSourceHttpSettings, Field, InlineField, InlineSwitch} from '@grafana/ui';
import {DataSourcePluginOptionsEditorProps} from '@grafana/data';
import {WildGraphQLDataSourceOptions} from '../types';

interface Props extends DataSourcePluginOptionsEditorProps<WildGraphQLDataSourceOptions> {}

export function ConfigEditor(props: Props) {
  const { onOptionsChange, options } = props;

  const { jsonData } = options;

  const onToggleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.checked;
    onOptionsChange({
      ...options,
      jsonData: {
        ...jsonData,
        useISODates: value,
      },
    });
  };
  // const onPathChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const jsonData = {
  //     ...options.jsonData,
  //     path: event.target.value,
  //   };
  //   onOptionsChange({ ...options, jsonData });
  // };

  // Secure field (only sent to the backend)
  // const onAPIKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   onOptionsChange({
  //     ...options,
  //     secureJsonData: {
  //       apiKey: event.target.value,
  //     },
  //   });
  // };


  // const onResetAPIKey = () => {
  //   onOptionsChange({
  //     ...options,
  //     secureJsonFields: {
  //       ...options.secureJsonFields,
  //       apiKey: false,
  //     },
  //     secureJsonData: {
  //       ...options.secureJsonData,
  //       apiKey: '',
  //     },
  //   });
  // };

  // const { jsonData, secureJsonFields } = options;
  // const secureJsonData = (options.secureJsonData || {}) as WildGraphQLSecureJsonData;

  return (
    <div className="gf-form-group">
      <DataSourceHttpSettings
        defaultUrl="http://localhost:8080"
        dataSourceConfig={options}
        onChange={onOptionsChange}
      />

      <InlineField
        label="Use ISO 8601 for time"
        tooltip="When enabled, $__from and $__to variables will be in ISO 8601 format instead of Unix timestamp"
        labelWidth={24}
      >
        <Field>
          <InlineSwitch
            value={jsonData.useISODates || false}
            onChange={onToggleChange}
          />
        </Field>
      </InlineField>

      {/*<InlineField label="API Key" labelWidth={12}>*/}
      {/*  <SecretInput*/}
      {/*    isConfigured={(secureJsonFields && secureJsonFields.apiKey) as boolean}*/}
      {/*    value={secureJsonData.apiKey || ''}*/}
      {/*    placeholder="secure json field (backend only)"*/}
      {/*    width={40}*/}
      {/*    onReset={onResetAPIKey}*/}
      {/*    onChange={onAPIKeyChange}*/}
      {/*  />*/}
      {/*</InlineField>*/}
    </div>
  );
}
