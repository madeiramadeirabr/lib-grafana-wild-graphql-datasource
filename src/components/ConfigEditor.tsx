import React from 'react';
import { css } from '@emotion/css';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import {
  AdvancedHttpSettings,
  Auth,
  ConfigSection,
  ConnectionSettings,
  convertLegacyAuthProps,
} from '@grafana/plugin-ui';
import { InlineField, InlineSwitch } from '@grafana/ui';
import { WildGraphQLDataSourceOptions } from '../types';

interface Props extends DataSourcePluginOptionsEditorProps<WildGraphQLDataSourceOptions> {}

// Match plugin-ui's connection, authentication, and advanced HTTP field widths.
const advancedSettingsClass = css({ maxWidth: 578 });

export function ConfigEditor({ onOptionsChange, options }: Props) {
  const onUseISODatesChange = (event: React.FormEvent<HTMLInputElement>) => {
    onOptionsChange({
      ...options,
      jsonData: { ...options.jsonData, useISODates: event.currentTarget.checked },
    });
  };

  return (
    <div className="gf-form-group">
      <ConnectionSettings
        config={options}
        onChange={onOptionsChange}
        urlPlaceholder="http://localhost:8080"
      />
      <Auth {...convertLegacyAuthProps({ config: options, onChange: onOptionsChange })} />
      <ConfigSection
        title="Advanced settings"
        className={advancedSettingsClass}
        isCollapsible
        isInitiallyOpen={Boolean(
          options.jsonData.keepCookies?.length || options.jsonData.timeout !== undefined || options.jsonData.useISODates
        )}
      >
        <AdvancedHttpSettings config={options} onChange={onOptionsChange} />
        <InlineField
          label="Use ISO 8601 for time"
          tooltip="When enabled, the from and to variables are sent in ISO 8601 format instead of Unix milliseconds"
          labelWidth={24}
        >
          <InlineSwitch value={options.jsonData.useISODates ?? false} onChange={onUseISODatesChange} />
        </InlineField>
      </ConfigSection>
    </div>
  );
}
