'use client';

import React, { useState } from 'react';
import { isDevelopment, mockContactAPI } from '../utils/mockApi';

interface FormField {
  label: string;
  type: string;
  required?: boolean;
  choices?: string[];
  placeholder?: string;
}

interface FormProps {
  fields: FormField[];
  submitText?: string;
  emailTo?: string;
  submitBgColor?: string | null;
  submitTextColor?: string | null;
  submithoverBackgroundColor?: string | null;
  submithoverTextColor?: string | null;
  formStyle?: any;
}

function toRgba(color: any): string | undefined {
  if (!color) return undefined;
  // Plain CSS string (new format)
  if (typeof color === 'string') return color || undefined;
  // Legacy {rgb, alpha} object shape
  if (color?.rgb) {
    const { r, g, b } = color.rgb;
    const a = color.alpha ?? 1;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return undefined;
}

const ContactForm: React.FC<FormProps> = ({
  fields,
  submitText = 'Send',
  emailTo,
  submitBgColor,
  submitTextColor,
  submithoverBackgroundColor,
  submithoverTextColor,
  formStyle,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: fieldValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    for (const field of fields) {
      if (field.required && !formData[field.label]) {
        setError(`Please fill out the required field: ${field.label}`);
        return;
      }
    }

    try {
      if (isDevelopment) {
        await mockContactAPI({ ...formData, emailTo });
        setSubmitted(true);
      } else {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, emailTo }),
        });
        if (!res.ok) {
          let msg = 'Submission failed. Please try again.';
          try {
            const data = await res.json();
            msg = data?.error || data?.details || msg;
          } catch {
            try { msg = await res.text(); } catch {}
          }
          throw new Error(msg);
        }
        setSubmitted(true);
      }
    } catch (err: any) {
      setError(err.message || 'Submission failed.');
    }
  };

  if (submitted) {
    const successBg = toRgba(formStyle?.successBackgroundColor) || 'rgba(0, 255, 194, 0.1)';
    const successText = toRgba(formStyle?.successTextColor);
    const successBorder = toRgba(formStyle?.successBorderColor) || '#00FFC2';
    const successMsg = formStyle?.successMessage || 'Thank you! Your message has been sent.';
    return (
      <div className="p-4 bradious" style={{ backgroundColor: successBg, border: `1px solid ${successBorder}`, ...(successText ? { color: successText } : {}) }}>
        <p className="font-semibold">{successMsg}</p>
      </div>
    );
  }

  const btnBg = toRgba(formStyle?.submitBtnBackgroundColor) || toRgba(submitBgColor);
  const btnText = toRgba(formStyle?.submitBtnTextColor) || toRgba(submitTextColor);
  const btnHoverBg = toRgba(formStyle?.submitBtnHoverBackgroundColor) || toRgba(submithoverBackgroundColor);
  const btnHoverText = toRgba(formStyle?.submitBtnHoverTextColor) || toRgba(submithoverTextColor);
  const btnBorderColor = toRgba(formStyle?.submitBtnBorderColor);
  const btnBorderWidth = typeof formStyle?.submitBtnBorderWidth === 'number' ? formStyle.submitBtnBorderWidth : 0;
  const btnBorderRadius = typeof formStyle?.submitBtnBorderRadius === 'number' ? formStyle.submitBtnBorderRadius : 9999;
  const btnPaddingX = typeof formStyle?.submitBtnPaddingX === 'number' ? formStyle.submitBtnPaddingX : 24;
  const btnPaddingY = typeof formStyle?.submitBtnPaddingY === 'number' ? formStyle.submitBtnPaddingY : 10;
  const btnFontSize = typeof formStyle?.submitBtnFontSize === 'number' ? `${formStyle.submitBtnFontSize}px` : undefined;
  const btnFontWeight = formStyle?.submitBtnFontWeight || undefined;
  const btnFullWidth = formStyle?.submitBtnFullWidth || false;
  const btnAlign = formStyle?.submitBtnAlign || 'left';
  const btnWrapStyle: React.CSSProperties = btnFullWidth ? {} : { textAlign: btnAlign === 'right' ? 'right' : btnAlign === 'center' ? 'center' : 'left', display: 'block' };

  // Wrapper style
  const wrapperBg = toRgba(formStyle?.wrapperBackgroundColor);
  const wrapperBorderColor = toRgba(formStyle?.wrapperBorderColor);
  const wrapperBorderWidth = typeof formStyle?.wrapperBorderWidth === 'number' ? formStyle.wrapperBorderWidth : 0;
  const wrapperStyle: React.CSSProperties = {
    ...(wrapperBg ? { backgroundColor: wrapperBg } : {}),
    paddingTop: typeof formStyle?.wrapperPaddingTop === 'number' ? `${formStyle.wrapperPaddingTop}px` : undefined,
    paddingBottom: typeof formStyle?.wrapperPaddingBottom === 'number' ? `${formStyle.wrapperPaddingBottom}px` : undefined,
    paddingLeft: typeof formStyle?.wrapperPaddingLeft === 'number' ? `${formStyle.wrapperPaddingLeft}px` : undefined,
    paddingRight: typeof formStyle?.wrapperPaddingRight === 'number' ? `${formStyle.wrapperPaddingRight}px` : undefined,
    borderRadius: typeof formStyle?.wrapperBorderRadius === 'number' ? `${formStyle.wrapperBorderRadius}px` : undefined,
    ...(wrapperBorderWidth > 0 ? { borderWidth: `${wrapperBorderWidth}px`, borderStyle: formStyle?.wrapperBorderStyle || 'solid', borderColor: wrapperBorderColor || undefined } : {}),
    ...(typeof formStyle?.formMaxWidth === 'number' ? { maxWidth: `${formStyle.formMaxWidth}px` } : {}),
  };

  // Label style
  const labelColor = toRgba(formStyle?.labelColor);
  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: typeof formStyle?.labelMarginBottom === 'number' ? `${formStyle.labelMarginBottom}px` : '4px',
    ...(labelColor ? { color: labelColor } : {}),
    fontSize: typeof formStyle?.labelFontSize === 'number' ? `${formStyle.labelFontSize}px` : '14px',
    fontWeight: formStyle?.labelFontWeight || undefined,
  };

  // Required asterisk color
  const requiredColor = toRgba(formStyle?.requiredColor);

  // Input style (base — focus handled with state)
  const buildInputStyle = (fieldName: string, isTextarea = false): React.CSSProperties => {
    const isFocused = focusedField === fieldName;
    const bg = isFocused
      ? (toRgba(formStyle?.inputFocusBackgroundColor) || toRgba(formStyle?.inputBackgroundColor))
      : toRgba(formStyle?.inputBackgroundColor);
    const borderColor = isFocused
      ? (toRgba(formStyle?.inputFocusBorderColor) || toRgba(formStyle?.inputBorderColor))
      : toRgba(formStyle?.inputBorderColor);
    const borderWidth = typeof formStyle?.inputBorderWidth === 'number' ? formStyle.inputBorderWidth : 1;
    return {
      display: 'block',
      width: '100%',
      paddingTop: typeof formStyle?.inputPaddingY === 'number' ? `${formStyle.inputPaddingY}px` : '8px',
      paddingBottom: typeof formStyle?.inputPaddingY === 'number' ? `${formStyle.inputPaddingY}px` : '8px',
      paddingLeft: typeof formStyle?.inputPaddingX === 'number' ? `${formStyle.inputPaddingX}px` : '12px',
      paddingRight: typeof formStyle?.inputPaddingX === 'number' ? `${formStyle.inputPaddingX}px` : '12px',
      borderRadius: typeof formStyle?.inputBorderRadius === 'number' ? `${formStyle.inputBorderRadius}px` : undefined,
      borderWidth: `${borderWidth}px`,
      borderStyle: 'solid',
      borderColor: borderColor || 'rgba(255,255,255,0.2)',
      backgroundColor: bg || 'rgba(255,255,255,0.05)',
      color: toRgba(formStyle?.inputTextColor) || undefined,
      fontSize: typeof formStyle?.inputFontSize === 'number' ? `${formStyle.inputFontSize}px` : undefined,
      boxShadow: formStyle?.inputShadow || undefined,
      outline: 'none',
      ...(isTextarea ? { minHeight: typeof formStyle?.textareaMinHeight === 'number' ? `${formStyle.textareaMinHeight}px` : '100px' } : {}),
    };
  };

  const fieldGap = typeof formStyle?.fieldGap === 'number' ? `${formStyle.fieldGap}px` : '16px';
  const errorColor = toRgba(formStyle?.errorTextColor) || '#EB5951';

  return (
    <form onSubmit={handleSubmit} style={{ ...wrapperStyle, display: 'flex', flexDirection: 'column', gap: fieldGap }}>
      {fields.map((field) => {
        const inputName = field.label;

        if (field.type === 'textarea') {
          return (
            <div key={inputName}>
              <label htmlFor={inputName} style={labelStyle}>
                {field.label}{field.required && <span style={requiredColor ? { color: requiredColor } : {}}> *</span>}
              </label>
              <textarea
                name={inputName}
                id={inputName}
                required={field.required}
                rows={4}
                placeholder={field.placeholder}
                style={buildInputStyle(inputName, true)}
                onFocus={() => setFocusedField(inputName)}
                onBlur={() => setFocusedField(null)}
                onChange={handleChange}
              />
            </div>
          );
        }

        if (field.type === 'checkbox') {
          if (Array.isArray(field.choices) && field.choices.length > 0) {
            const checkSize = typeof formStyle?.checkRadioSize === 'number' ? `${formStyle.checkRadioSize}px` : '16px';
            const checkGap = typeof formStyle?.checkRadioGap === 'number' ? `${formStyle.checkRadioGap}px` : '8px';
            const optionLabelColor = toRgba(formStyle?.checkRadioLabelColor);
            return (
              <div key={inputName}>
                <p style={labelStyle}>{field.label}{field.required && <span style={requiredColor ? { color: requiredColor } : {}}> *</span>}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {field.choices.map((choice) => {
                    const choiceId = `${inputName}_${choice}`;
                    const checked = Array.isArray(formData[inputName]) ? formData[inputName].includes(choice) : false;
                    return (
                      <div key={choice} style={{ display: 'flex', alignItems: 'center', gap: checkGap }}>
                        <input
                          type="checkbox" id={choiceId} name={inputName} value={choice} checked={checked}
                          style={{ width: checkSize, height: checkSize, accentColor: toRgba(formStyle?.checkRadioAccentColor) || undefined }}
                          onChange={(e) => {
                            const current: string[] = Array.isArray(formData[inputName]) ? [...formData[inputName]] : [];
                            if (e.target.checked) setFormData((prev) => ({ ...prev, [inputName]: [...current, choice] }));
                            else setFormData((prev) => ({ ...prev, [inputName]: current.filter((v) => v !== choice) }));
                          }}
                        />
                        <label htmlFor={choiceId} style={{ fontSize: '14px', ...(optionLabelColor ? { color: optionLabelColor } : {}) }}>{choice}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }
          return (
            <div key={inputName} style={{ display: 'flex', alignItems: 'center', gap: typeof formStyle?.checkRadioGap === 'number' ? `${formStyle.checkRadioGap}px` : '8px' }}>
              <input type="checkbox" name={inputName} id={inputName} required={field.required}
                style={{ width: typeof formStyle?.checkRadioSize === 'number' ? `${formStyle.checkRadioSize}px` : '16px', height: typeof formStyle?.checkRadioSize === 'number' ? `${formStyle.checkRadioSize}px` : '16px', accentColor: toRgba(formStyle?.checkRadioAccentColor) || undefined }}
                onChange={handleChange} />
              <label htmlFor={inputName} style={{ fontSize: '14px' }}>{field.label}{field.required && ' *'}</label>
            </div>
          );
        }

        if (field.type === 'radio') {
          const choices = Array.isArray(field.choices) ? field.choices : [];
          const checkSize = typeof formStyle?.checkRadioSize === 'number' ? `${formStyle.checkRadioSize}px` : '16px';
          const checkGap = typeof formStyle?.checkRadioGap === 'number' ? `${formStyle.checkRadioGap}px` : '8px';
          const optionLabelColor = toRgba(formStyle?.checkRadioLabelColor);
          return (
            <div key={inputName}>
              <p style={labelStyle}>{field.label}{field.required && <span style={requiredColor ? { color: requiredColor } : {}}> *</span>}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {choices.map((choice) => {
                  const choiceId = `${inputName}_${choice}`;
                  return (
                    <div key={choice} style={{ display: 'flex', alignItems: 'center', gap: checkGap }}>
                      <input type="radio" id={choiceId} name={inputName} value={choice} required={field.required}
                        checked={formData[inputName] === choice}
                        style={{ width: checkSize, height: checkSize, accentColor: toRgba(formStyle?.checkRadioAccentColor) || undefined }}
                        onChange={() => setFormData((prev) => ({ ...prev, [inputName]: choice }))} />
                      <label htmlFor={choiceId} style={{ fontSize: '14px', ...(optionLabelColor ? { color: optionLabelColor } : {}) }}>{choice}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        const inputType = field.type === 'email' ? 'email' : field.type === 'phone' ? 'tel' : field.type === 'number' ? 'number' : 'text';
        return (
          <div key={inputName}>
            <label htmlFor={inputName} style={labelStyle}>
              {field.label}{field.required && <span style={requiredColor ? { color: requiredColor } : {}}> *</span>}
            </label>
            <input
              type={inputType}
              name={inputName}
              id={inputName}
              required={field.required}
              placeholder={field.placeholder}
              style={buildInputStyle(inputName)}
              onFocus={() => setFocusedField(inputName)}
              onBlur={() => setFocusedField(null)}
              onChange={handleChange}
            />
          </div>
        );
      })}

      {error && (
        <p style={{ fontSize: '14px', color: errorColor }}>{error}</p>
      )}

      <div style={btnWrapStyle}>
        <button
          type="submit"
          className="sanity-btn"
          style={{
            backgroundColor: btnBg || '#314D55',
            color: btnText || '#f1f1f1',
            ...(btnHoverBg ? { ['--sanity-btn-hover-bg' as any]: btnHoverBg } : {}),
            ...(btnHoverText ? { ['--sanity-btn-hover-text' as any]: btnHoverText } : {}),
            padding: `${btnPaddingY}px ${btnPaddingX}px`,
            borderRadius: `${btnBorderRadius}px`,
            border: btnBorderWidth > 0 ? `${btnBorderWidth}px solid ${btnBorderColor || 'transparent'}` : 'none',
            cursor: 'pointer',
            ...(btnFontSize ? { fontSize: btnFontSize } : {}),
            ...(btnFontWeight ? { fontWeight: btnFontWeight } : {}),
            ...(btnFullWidth ? { width: '100%' } : {}),
          }}
        >
          {submitText}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
