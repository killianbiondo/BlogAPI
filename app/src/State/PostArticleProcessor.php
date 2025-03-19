<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Dto\ArticleDto;
use App\Entity\Article;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

readonly class PostArticleProcessor implements ProcessorInterface
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private Security               $security
    ) {}

    public function process(
        mixed     $data,
        Operation $operation,
        array     $uriVariables = [],
        array     $context      = []
    ): mixed
    {
        if (!$data instanceof ArticleDto) {
            return new JsonResponse([
                'status' => 400,
                'success' => false,
                'message' => 'Le format de données est incorrect'
            ], 400);
        }

        // Récupérer l'utilisateur actuellement authentifié
        $user = $this->security->getUser();

        // Vérifier si l'utilisateur est authentifié
        if (!$user instanceof User) {
            dd("ok");
            return new JsonResponse([
                'status' => 401,
                'success' => false,
                'message' => 'Vous devez être connecté pour créer un blog'
            ], 401);
        }

        $blog = new Article();
        $blog->setTitle($data->title);
        $blog->setContent($data->content);
        $blog->setAutor($user);


        $this->entityManager->persist($blog);
        $this->entityManager->flush();

        return $blog;
    }
}