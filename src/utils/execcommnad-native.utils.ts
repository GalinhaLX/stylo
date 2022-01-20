import {ExecCommandAction, ExecCommandList, ExecCommandStyle} from '../types/execcommand';
import {ToolbarAlign, ToolbarFontSize} from '../types/toolbar';

export const execCommandNative = (action: ExecCommandAction) => {
  if (action.cmd === 'style') {
    execCommandNativeStyle(action);
  } else if (action.cmd === 'list') {
    execCommandNativeList(action);
  }
};

const execCommandNativeStyle = (action: ExecCommandAction) => {
  const detail: ExecCommandStyle = action.detail as ExecCommandStyle;

  // @ts-ignore
  document.execCommand('styleWithCSS', false, true);

  switch (detail.style) {
    case 'color':
      document.execCommand('foreColor', false, detail.value);
      break;
    case 'background-color':
      document.execCommand('backColor', false, detail.value);
      break;
    case 'font-size':
      document.execCommand(
        'fontSize',
        false,
        ToolbarFontSize[detail.value.replace('-', '_').toUpperCase()]
      );
      break;
    case 'font-weight':
      document.execCommand('bold', false, null);
      break;
    case 'font-style':
      document.execCommand('italic', false, null);
      break;
    case 'text-decoration':
      document.execCommand(
        detail.value === 'line-through' ? 'strikeThrough' : 'underline',
        false,
        null
      );
      break;
  }
};

const execCommandNativeList = (action: ExecCommandAction) => {
  const detail: ExecCommandList = action.detail as ExecCommandList;

  switch (detail.type) {
    case 'ol':
      document.execCommand('insertOrderedList', false, null);
      break;
    case 'ul':
      document.execCommand('insertUnorderedList', false, null);
      break;
  }
};

export const execCommandNativeAlign = (align: ToolbarAlign) => {
  switch (align) {
    case ToolbarAlign.CENTER:
      document.execCommand('justifyCenter', false, null);
      break;
    case ToolbarAlign.RIGHT:
      document.execCommand('justifyRight', false, null);
      break;
    default:
      document.execCommand('justifyLeft', false, null);
  }
};
