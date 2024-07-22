import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface CardProps {
  avatarSrc: string;
  title: string;
  description: string;
  buttonText: string;
}

export function CardLicenciados({ avatarSrc, title, description, buttonText }: CardProps) {
  return (
    <>
      <div className="relative size-fit col-span-2">
        <span className="flex justify-center items-center flex-shrink-0 bg-purple-500 text-base text-white select-none w-[45px] h-[45px]" style={{ clipPath: 'url(#avatarMask)' }}>
          <svg width="0" height="0">
            <defs>
              <clipPath id="avatarMask" clipPathUnits="objectBoundingBox">
                <path d="M0.93,0.177 c-0.074,-0.118,-0.219,-0.177,-0.43,-0.177 h0 c-0.211,0,-0.356,0.06,-0.429,0.177 c-0.062,0.099,-0.07,0.224,-0.07,0.323 c0,0.098,0.008,0.224,0.07,0.323 c0.074,0.118,0.218,0.177,0.429,0.177 h0 c0.212,0,0.356,-0.06,0.43,-0.177 c0.062,-0.099,0.07,-0.224,0.07,-0.323 c0,-0.098,-0.008,-0.224,-0.07,-0.323 l0,0"></path>
              </clipPath>
            </defs>
          </svg>
          <Image
            className="h-full w-full rounded-[inherit] object-cover"
            src={avatarSrc}
            alt="Avatar"
            width={45} // Propriedade width adicionada
            height={45} // Propriedade height adicionada
          />
        </span>
      </div>
      <CardHeader className="grid col-span-4 p-0">
        <CardTitle className="text-normal font-bold">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <Badge className="grid col-span-2 items-center text-center" variant="secondary">
        {buttonText}
      </Badge>
    </>
  );
};

export default CardLicenciados;
