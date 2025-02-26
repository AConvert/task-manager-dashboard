import React from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "User Avatar",
  size = 50,
}) => {
  return (
    <div
      className="flex items-center justify-center overflow-hidden rounded-full border border-gray-300 shadow-sm"
      style={{ width: size, height: size }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          width={30}
          height={30}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <div className="flex items-center justify-center bg-gray-200 text-gray-600 w-full h-full text-lg font-bold">
          ?
        </div>
      )}
    </div>
  );
};

export default Avatar;
