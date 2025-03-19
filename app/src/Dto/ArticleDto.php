<?php

namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class ArticleDto
{
    #[Assert\NotBlank]
    public string $title;

    #[Assert\NotBlank]
    public string $content;
}