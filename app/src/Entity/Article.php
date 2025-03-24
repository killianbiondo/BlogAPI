<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Dto\ArticleDto;
use App\State\PostArticleProcessor;
use App\State\PutArticleProcessor;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;


#[ORM\Entity]
#[ApiResource(
    operations: [
        new Post(
            security: "is_granted('ROLE_USER')",
            input: ArticleDto::class,
            processor: PostArticleProcessor::class
        ),
        new Get(normalizationContext : ['groups' => ['blog:read','user:read']]),
        new GetCollection(normalizationContext : ['groups' => ['blog:read','user:read']]),
        new Put(
            security: "is_granted('ROLE_USER') and object.getAuthor() == user",
            input: ArticleDto::class,
            processor: PutArticleProcessor::class

        ),
        new Delete(security: "is_granted('ROLE_USER') and object.getAuthor() == user"),
    ]
)]


class Article
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private string $title;

    #[ORM\Column(type: "text")]
    private string $content;

    #[ORM\Column(type: "datetime_immutable")]
    private \DateTimeImmutable $createdAt;

    #[ORM\ManyToOne(inversedBy: 'articles')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $autor = null;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;
        return $this;
    }

    public function getContent(): string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;
        return $this;
    }

    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getAuthor(): ?User
    {
        return $this->autor;
    }

    public function setAuthor(?User $autor): static
    {
        $this->autor = $autor;

        return $this;
    }
}
