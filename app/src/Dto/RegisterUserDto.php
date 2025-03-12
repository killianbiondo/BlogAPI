<?php


namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

class RegisterUserDto
{
    #[Assert\NotBlank]
    #[Assert\Email]
    #[Groups(['user:write'])]
    public ?string $email = null;

    #[Assert\NotBlank]
    #[Assert\Length(min: 6)]
    #[Groups(['user:write'])]
    public ?string $password = null;
}
