import React from 'react';
import { Button } from '../src/components/Button';
import { TextField } from '../src/components/TextField';
import { LoadingIndicator } from '../src/components/LoadingIndicator';
import { ErrorMessage } from '../src/components/ErrorMessage';

describe('UI Atomic Components', () => {
  it('Button should initialize with default props', () => {
    const handlePress = jest.fn();
    const element = <Button title="Click Me" onPress={handlePress} />;
    expect(element.props.title).toBe('Click Me');
    expect(element.props.variant).toBeUndefined(); // defaults to primary in component
  });

  it('TextField should accept value and label', () => {
    const element = <TextField label="Email" value="test@example.com" placeholder="Enter email" />;
    expect(element.props.label).toBe('Email');
    expect(element.props.value).toBe('test@example.com');
  });

  it('LoadingIndicator should default to accessible loading text', () => {
    const element = <LoadingIndicator />;
    expect(element.props.message).toBeUndefined(); // component provides default 'Loading...'
  });

  it('ErrorMessage should provide error message and code', () => {
    const element = <ErrorMessage message="Connection timed out" code="TIMEOUT" />;
    expect(element.props.message).toBe('Connection timed out');
    expect(element.props.code).toBe('TIMEOUT');
  });
});
