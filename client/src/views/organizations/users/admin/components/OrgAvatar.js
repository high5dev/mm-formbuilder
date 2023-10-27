// ** React Imports
import { forwardRef } from 'react';

// ** Third Party Components
import Proptypes from 'prop-types';
import classnames from 'classnames';

// ** Reactstrap Imports
import { Badge } from 'reactstrap';

const OrgAvatar = forwardRef((props, ref) => {
  // ** Props
  const {
    img,
    size,
    icon,
    color,
    status,
    badgeUp,
    content,
    tag: Tag,
    initials,
    imgWidth,
    className,
    badgeText,
    imgHeight,
    badgeColor,
    imgClassName,
    contentStyles,
    ...rest
  } = props;

  // ** Function to extract initials from content
  const getInitials = (str) => {
    const results = [];
    const wordArray = str?.split(' ');
    wordArray?.forEach((e) => {
      results?.push(e[0]);
    });
    return results?.join('');
  };

  return (
    <Tag
      className={
        img === false || img === undefined
          ? classnames('avatar', {
              [className]: className,
              [`bg-${color}`]: color,
              [`avatar-${size}`]: size
            })
          : 'd-flex justify-content-center align-items-center mt-2'
      }
      ref={ref}
      {...rest}
    >
      {img === false || img === undefined ? (
        <span
          className={classnames('avatar-content', {
            'position-relative': badgeUp
          })}
          style={contentStyles}
        >
          {initials ? getInitials(content) : content}

          {icon ? icon : null}
          {badgeUp ? (
            <Badge color={badgeColor ? badgeColor : 'primary'} className="badge-sm badge-up" pill>
              {badgeText ? badgeText : '0'}
            </Badge>
          ) : null}
        </span>
      ) : (
        <div
          style={{
            width: imgWidth && !size ? imgWidth : '200px',
            height: imgHeight && !size ? imgHeight : '100px',
            overflow: 'hidden'
          }}
          className='d-flex justify-content-center align-items-center'
        >
          <img
            className={classnames({
              [imgClassName]: imgClassName
            })}
            src={img}
            alt="avatarImg"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover'
            }}
            // height={imgHeight && !size ? imgHeight : '32px'}
            // width={imgWidth && !size ? imgWidth : '32px'}
          />
        </div>
      )}
      {status ? (
        <span
          className={classnames({
            [`avatar-status-${status}`]: status,
            [`avatar-status-${size}`]: size
          })}
        ></span>
      ) : null}
    </Tag>
  );
});

export default OrgAvatar;

// ** PropTypes
OrgAvatar.propTypes = {
  icon: Proptypes.node,
  src: Proptypes.string,
  badgeUp: Proptypes.bool,
  content: Proptypes.string,
  badgeText: Proptypes.string,
  className: Proptypes.string,
  imgClassName: Proptypes.string,
  contentStyles: Proptypes.object,
  size: Proptypes.oneOf(['sm', 'lg', 'xl']),
  tag: Proptypes.oneOfType([Proptypes.func, Proptypes.string]),
  status: Proptypes.oneOf(['online', 'offline', 'away', 'busy']),
  imgHeight: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
  imgWidth: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
  badgeColor: Proptypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'info',
    'warning',
    'dark',
    'light-primary',
    'light-secondary',
    'light-success',
    'light-danger',
    'light-info',
    'light-warning',
    'light-dark'
  ]),
  color: Proptypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'info',
    'warning',
    'dark',
    'light-primary',
    'light-secondary',
    'light-success',
    'light-danger',
    'light-info',
    'light-warning',
    'light-dark'
  ]),
  initials(props) {
    if (props['initials'] && props['content'] === undefined) {
      return new Error('content prop is required with initials prop.');
    }
    if (props['initials'] && typeof props['content'] !== 'string') {
      return new Error('content prop must be a string.');
    }
    if (typeof props['initials'] !== 'boolean' && props['initials'] !== undefined) {
      return new Error('initials must be a boolean!');
    }
  }
};

// ** Default Props
OrgAvatar.defaultProps = {
  tag: 'div'
};
