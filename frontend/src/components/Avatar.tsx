import classNames from 'classnames';
import React, { type ElementType, type ForwardRefExoticComponent, type HTMLAttributes, type ReactNode } from 'react';

// --- Types et Interfaces ---

export interface AvatarProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  ratio?: '4by3' | string;
  size?: 'xs' | 'sm' | 'lg' | 'xl' | 'xxl' | string;
  status?: 'online' | 'offline' | string;
  children?: ReactNode;
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children?: ReactNode;
}

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  as?: ElementType;
}

export interface AvatarTitleProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children?: ReactNode;
}

// --- Composant Principal ---

interface AvatarComponent extends ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLElement>> {
  Group: ForwardRefExoticComponent<AvatarGroupProps & React.RefAttributes<HTMLElement>>;
  Image: ForwardRefExoticComponent<AvatarImageProps & React.RefAttributes<HTMLElement>>;
  Title: ForwardRefExoticComponent<AvatarTitleProps & React.RefAttributes<HTMLElement>>;
}

const Avatar = React.forwardRef<HTMLElement, AvatarProps>(
  ({ as: Tag = 'div', ratio, size, status, className, ...props }, ref) => {
    const classes = classNames(
      'avatar',
      ratio && `avatar-${ratio}`,
      size && `avatar-${size}`,
      status && `avatar-${status}`,
      className
    );

    return <Tag className={classes} ref={ref} {...props} />;
  }
) as AvatarComponent;

// --- Sous-composants ---

Avatar.Group = React.forwardRef<HTMLElement, AvatarGroupProps>(
  ({ as: Tag = 'div', className, ...props }, ref) => {
    const classes = classNames('avatar-group', className);
    return <Tag className={classes} ref={ref} {...props} />;
  }
);

Avatar.Image = React.forwardRef<HTMLElement, AvatarImageProps>(
  ({ as: Tag = 'img', className, ...props }, ref) => {
    const classes = classNames('avatar-img', className);
    return <Tag className={classes} ref={ref} {...props} />;
  }
);

Avatar.Title = React.forwardRef<HTMLElement, AvatarTitleProps>(
  ({ as: Tag = 'div', className, ...props }, ref) => {
    const classes = classNames('avatar-title', className);
    return <Tag className={classes} ref={ref} {...props} />;
  }
);

Avatar.displayName = 'Avatar';
Avatar.Group.displayName = 'Avatar.Group';
Avatar.Image.displayName = 'Avatar.Image';
Avatar.Title.displayName = 'Avatar.Title';

export default Avatar;