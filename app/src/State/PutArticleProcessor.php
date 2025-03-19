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


readonly class PutArticleProcessor implements ProcessorInterface
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

if (empty($uriVariables['id'])) {
return new JsonResponse([
'status' => 400,
'success' => false,
'message' => 'L\'id du blog est obligatoire'
], 400);
}

// Récupérer l'utilisateur actuellement authentifié
$user = $this->security->getUser();

// Vérifier si l'utilisateur est authentifié
if (!$user instanceof User) {
return new JsonResponse([
'status' => 401,
'success' => false,
'message' => 'Vous devez être connecté pour modifier un blog'
], 401);
}

// Récupérer le blog
$blog = $this->entityManager->getRepository(Article::class)->find($uriVariables['id']);

if (!$blog) {
return new JsonResponse([
'status' => 404,
'success' => false,
'message' => 'Aucun blog trouvé avec l\'id '. $uriVariables['id']
], 404);
}

// Vérifier si le blog appartient bien à l'utilisateur connecté
if ($blog->getAuthor()!== $user) {
return new JsonResponse([
'status' => 403,
'success' => false,
'message' => 'Vous ne pouvez modifier un blog que si vous êtes son auteur'
], 403);
}

// Mise à jour du blog
$blog->setTitle($data->title);
$blog->setContent($data->content);

$this->entityManager->flush();

return $blog;
}
}